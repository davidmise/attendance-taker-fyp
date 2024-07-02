import { defineStore } from 'pinia'
import { ref, onValue } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'
import { database, firestore } from '@/firebase/init'

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    totalStudents: 0,
    totalPresent: 0,
    totalAbsent: 0,
    students: [],
  }),
  getters: {
    getTotalStudents: (state) => state.totalStudents,
    getTotalPresent: (state) => state.totalPresent,
    getTotalAbsent: (state) => state.totalAbsent,
  },
  actions: {
    async fetchStudents() {
      // Fetch from Firebase Realtime Database
      const studentsRef = ref(database, 'student')
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.updateStudentData(data)
        }
      })

      // Fetch from Firestore
      const studentsCollection = collection(firestore, 'student')
      const querySnapshot = await getDocs(studentsCollection)
      const firestoreData = {}
      querySnapshot.forEach((doc) => {
        firestoreData[doc.id] = doc.data()
      })

      this.updateStudentData(firestoreData)
    },
    updateStudentData(data) {
      if (data) {
        this.students = []
        let presentCount = 0
        let absentCount = 0
        for (const key in data) {
          const studentStatus = data[key].attendance || 'N/A'
          this.students.push({
            id: key,
            name: data[key].name,
            Class: data[key].Class,
            RegNumber: data[key].RegNumber || '',
            status: studentStatus,
            timestamp: data[key].timestamp || 'N/A'
          })
          if (studentStatus === true) {
            presentCount++
          } else if (studentStatus === false) {
            absentCount++
          }
        }
        this.totalStudents = this.students.length
        this.totalPresent = presentCount
        this.totalAbsent = absentCount
      }
    }
  },
})
