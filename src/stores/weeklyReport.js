// stores/weeklyReport.js
import { defineStore } from 'pinia'
import { ref,  onValue } from 'firebase/database'
import { database } from '@/firebase/init'
// import { defineStore } from 'pinia';
import {  set } from 'firebase/database';
// import { database } from '@/firebase/init';
// 
export const useWeeklyReportStore= defineStore('reports', {
  state: () => ({
    students: [],
  }),

  actions: {
    updateAttendance(studentId, date, present) {
      const studentRef = ref(database, `student/${studentId}/attendance/${date}`);
      
      // Update the attendance status and lastAttendanceUpdate timestamp
      set(studentRef, {
        present: present,
        entryTime: this.getCurrentTime(),
        lastAttendanceUpdate: new Date().toISOString(),
      });
    },

    fetchStudents() {
      const studentsRef = ref(database, 'student');

      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.students = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
        } else {
          this.students = [];
        }
      }, (error) => {
        console.error('Error fetching students:', error);
      });
    },
  },

  getters: {
    getAllStudents() {
      return this.students;
    },
    getStudentById: (state) => (id) => {
      return state.students.find(student => student.id === id);
    },
  },
});
