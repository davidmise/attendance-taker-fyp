import { defineStore } from 'pinia'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/firebase/init'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const useWeeklyReportStore = defineStore('weeklyReport', {
  state: () => ({
    students: [],
    attendance: [],
    report: [],
  }),
  actions: {
    async updateAttendance(studentId, present) {
      const date = getCurrentDate()
      const time = getCurrentTime()
      const attendanceRef = doc(firestore, `attendance/${studentId}_${date}`)

      try {
        await setDoc(attendanceRef, {
          studentId,
          date,
          time,
          present,
          timestamp: new Date().toISOString(),
        }, { merge: true })
      } catch (error) {
        console.error('Error updating attendance:', error)
      }
    },
    async fetchStudents() {
      const studentsRef = collection(firestore, 'student')
      const querySnapshot = await getDocs(studentsRef)
      this.students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    async fetchAttendance() {
      const attendanceRef = collection(firestore, 'attendance')
      const querySnapshot = await getDocs(attendanceRef)
      this.attendance = querySnapshot.docs.map(doc => doc.data())
      // console.log('attendance fetched', querySnapshot)
    },
    generateReport() {
      const report = this.students.map(student => {
        const attendanceRecords = this.attendance.filter(record => record.studentId === student.id)
        return {
          ...student,
          attendance: attendanceRecords.map(record => ({
            date: record.date,
            time: record.time,
            present: record.present,
            timestamp: record.timestamp,
          })),
        }
      })
      this.report = report
    },
    exportToSpreadsheet() {
      const data = this.report.map(student => ({
        'Student ID': student.id,
        'Student Name': student.name,
        'Class': student.Class,
        'Registration Number': student.RegNumber,
        'Attendance Records': student.attendance.map(record => `${record.date} ${record.time} - ${record.present ? 'Present' : 'Absent'}`).join('; '),
      }))

      console.log('attendance',data)
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report')

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const dataBlob = new Blob([excelBuffer], { type: EXCEL_TYPE })
      saveAs(dataBlob, `Attendance_Report_${getCurrentDate()}.xlsx`)
    }
  },
  getters: {
    getAllStudents(state) {
      return state.students
    },
    getReport(state) {
      return state.report
    },
    getTotalStudents(state) {
      return state.students.length
    }
  }
})

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
