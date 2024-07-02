import { defineStore } from 'pinia'
import { ref, set, onValue } from 'firebase/database'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { database, firestore } from '@/firebase/init'

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    attendanceData: [],
    attendanceHistory: {} // Store history by date
  }),
  actions: {
    markAttendance(studentId) {
      const studentRef = ref(database, `student/${studentId}`)
      const firestoreRef = doc(firestore, 'student', studentId)

      onValue(studentRef, async (snapshot) => {
        const student = snapshot.val()

        if (student && student.attendance === false) {
          const attendanceData = {
            ...student,
            attendance: true,
            attendanceTimestamp: getCurrentDateTime(),
          }

          // Update attendance in Realtime Database
          await set(studentRef, attendanceData)

          // Update attendance in Firestore
          await updateDoc(firestoreRef, {
            ...attendanceData,
            history: arrayUnion({
              date: getCurrentDate(),
              attendance: true,
              timestamp: getCurrentDateTime()
            })
          })
        }
      })
    },
    async fetchAttendanceHistory(studentId, date) {
      const firestoreRef = doc(firestore, 'student', studentId)
      const docSnapshot = await firestoreRef.get()

      if (docSnapshot.exists) {
        const data = docSnapshot.data()
        if (data.history) {
          this.attendanceHistory[studentId] = data.history.filter(record => record.date === date)
        }
      }
    },
  },
})

// Helper function to get current date and time
function getCurrentDateTime() {
  const now = new Date()
  return now.toLocaleString()
}

function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
