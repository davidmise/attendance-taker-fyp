// stores/summary.js
import { defineStore } from 'pinia'
import { ref, onValue } from 'firebase/database'
import { database } from '@/firebase/init'

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
    fetchStudents() {
      const studentsRef = ref(database, 'student')
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val()
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
      })
    },
  },
})
