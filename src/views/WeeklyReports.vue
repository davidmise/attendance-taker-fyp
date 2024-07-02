<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <TopBar />
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Weekly</strong> Reports</h1>

          <div>
            <h1>Student Reports</h1>
            <p>Total Students: {{ totalStudents }}</p>

            <!-- Date Selector -->
            <input type="date" v-model="selectedDate" @change="fetchAttendanceForDate" />

            <!-- Export Button -->
            <button class="btn btn-primary" @click="exportToSpreadsheet">
              Export to Spreadsheet
            </button>

            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Registration Number</th>
                  <th>Attendance Records</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in report" :key="student.id">
                  <td>{{ student.id }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.Class }}</td>
                  <td>{{ student.RegNumber }}</td>
                  <td>
                    <ul>
                      <li v-for="record in student.attendance" :key="record.date">
                        {{ record.date }} {{ record.time }} - {{ record.present ? 'Present' : 'Absent' }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  </div>
</template>

<script>
import { useWeeklyReportStore } from '@/stores/weeklyReport'
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { ref, watch } from 'vue'

export default {
  components: {
    Sidebar,
    TopBar,
    FooterSection
  },
  setup() {
    const weeklyReportStore = useWeeklyReportStore()
    const selectedDate = ref(new Date().toISOString().substr(0, 10))

    watch(selectedDate, () => {
      weeklyReportStore.fetchAttendance()
    })

    weeklyReportStore.fetchStudents()
    weeklyReportStore.fetchAttendance()
    weeklyReportStore.generateReport()

    return {
      selectedDate,
      students: weeklyReportStore.getAllStudents,
      report: weeklyReportStore.getReport,
      totalStudents: weeklyReportStore.getTotalStudents,
      exportToSpreadsheet: weeklyReportStore.exportToSpreadsheet,
    }
  }
}
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
