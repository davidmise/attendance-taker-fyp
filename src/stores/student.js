import { defineStore } from 'pinia'
import { collection, doc, setDoc, updateDoc, getDocs } from 'firebase/firestore'
import { ref, set } from 'firebase/database'
import { firestore, database } from '@/firebase/init'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [], // Renamed from `student` to `students`
  }),
  actions: {
    async addStudent(student) {
      const firestoreRef = doc(firestore, 'student', student.id)
      const databaseRef = ref(database, `student/${student.id}`)

      const studentData = {
        name: student.name,
        Class: student.Class,
        RegNumber: student.RegNumber, // Added RegNumber
        attendance: false,
        entryDate: getCurrentDate(),
        entryTime: getCurrentTime(),
      }

      // Add student to Firestore and Realtime Database
      try {
        await setDoc(firestoreRef, studentData)
        console.log('Student added to Firestore with ID:', student.id)

        await set(databaseRef, studentData)
        console.log('Student added to Realtime Database with ID:', student.id)
      } catch (error) {
        console.error('Error adding student:', error)
      }
    },
    async updateAttendance(studentId, attendanceStatus) {
      const firestoreRef = doc(firestore, 'student', studentId)
      const databaseRef = ref(database, `student/${studentId}`)

      const newStatus = attendanceStatus === 'Present' ? true : false
      const timestamp = getCurrentTimestamp()

      // Update Firestore and Realtime Database
      try {
        await updateDoc(firestoreRef, {
          attendance: newStatus,
          timestamp: timestamp,
        })
        console.log('Attendance updated in Firestore for student ID:', studentId)

        await updateDoc(databaseRef, {
          attendance: newStatus,
          timestamp: timestamp,
        })
        console.log('Attendance updated in Realtime Database for student ID:', studentId)
      } catch (error) {
        console.error('Error updating attendance:', error)
      }
    },
    async fetchStudents() {
      const studentsRef = collection(firestore, 'student')

      try {
        const querySnapshot = await getDocs(studentsRef)
        this.students = querySnapshot.docs.map(doc => doc.data())
      } catch (error) {
        console.error('Error fetching students from Firestore:', error)
      }
    },
  },
})

// Helper functions
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getCurrentTime() {
  const now = new Date()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

function getCurrentTimestamp() {
  return Math.floor(new Date().getTime() / 1000)
}
