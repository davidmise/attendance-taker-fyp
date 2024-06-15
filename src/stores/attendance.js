// attendanceStore.js

import { defineStore } from 'pinia';
import { ref, set, onValue } from 'firebase/database';
import { database } from '@/firebase/init';

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    attendanceData: [],
  }),
  actions: {
    markAttendance(studentId) {
      const studentRef = ref(database, `student/${studentId}`);

      // Listen for changes in the attendance boolean
      onValue(studentRef, (snapshot) => {
        const student = snapshot.val();

        if (student && student.attendance === false) {
          // Update attendance to true and store timestamp
          set(studentRef, {
            ...student,
            attendance: true,
            attendanceTimestamp: getCurrentDateTime(),
          });
        }
      });
    },
  },
});

// Helper function to get current date and time
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString(); // Adjust format as needed
}
