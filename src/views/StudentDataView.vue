<script setup>
// Import necessary components and functions
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { database } from '@/firebase/init'
import { ref, onValue } from 'firebase/database'
import { reactive, computed, onMounted } from 'vue'
import { useAttendanceStore } from '@/stores/attendance'

// Define a reactive state object to store students data
const state = reactive({
  students: [],
  selectedDate: new Date().toISOString().substr(0, 10)
})

// Fetch students data from Firebase
const fetchStudents = () => {
  const studentsRef = ref(database, 'student')
  onValue(studentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      state.students = []
      for (const key in data) {
        if (data[key].Class === 'Form 1') {
          state.students.push({
            id: key,
            name: data[key].name,
            Class: data[key].Class,
            status: data[key].attendance,
            timestamp: data[key].entryTime || 'N/A'
          })
        }
      }
    }
  })
}

// Computed property to get Form 1 students
const formOneStudents = computed(() => state.students)

// Fetch students data when the component is mounted
onMounted(() => {
  fetchStudents()
})

// Function to determine the CSS class for status badges based on attendance status
const statusBadgeClass = (status) => {
  return {
    'badge bg-success': status === true,  // Green badge for 'Present'
    'badge bg-danger': status === false,  // Red badge for 'Absent'
  }
}

// Function to count the number of students with a specific status
const countStatus = (status) => {
  return formOneStudents.value
    ? formOneStudents.value.filter((student) => student.status === status).length
    : 0
}

// Function to convert status value to text
const statusText = (status) => {
  console.log(status)
  return status === true ? 'Present' : 'Absent'
}

// Function to mark attendance using the attendance store
const attendanceStore = useAttendanceStore()
const markAttendance = (studentId) => {
  attendanceStore.markAttendance(studentId)
}

// Function to fetch attendance history for a specific date
const fetchAttendanceHistory = async () => {
  for (const student of state.students) {
    await attendanceStore.fetchAttendanceHistory(student.id, state.selectedDate)
  }
}

onMounted(() => {
  fetchStudents()
})
</script>

<template>
  <div class="wrapper">
    <!-- Sidebar component -->
    <Sidebar />

    <div class="main">
      <!-- TopBar component -->
      <TopBar />

      <main class="content">
        <div class="container-fluid p-0">
          <!-- Page Title -->
          <h1 class="h3 mb-3"><strong>Attendance</strong> History</h1>

          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <!-- Card to display student attendance table -->
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col">
                      <!-- Display current date -->
                      <h5 class="card-title mb-0">Date: <input type="date" v-model="state.selectedDate" @change="fetchAttendanceHistory" /></h5>
                    </div>
                    <div class="col">
                      <!-- Display class information -->
                      <h5 class="card-title mb-0">Class: Form 1</h5>
                    </div>
                  </div>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th class="d-none d-xl-table-cell">Class</th>
                      <th class="d-none d-xl-table-cell">Status</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Loop through each student and display their information -->
                    <tr v-for="(student, index) in formOneStudents" :key="index">
                      <td>{{ student.id }}</td>
                      <td>{{ student.name }}</td>
                      <td class="d-none d-xl-table-cell">{{ student.Class }}</td>
                      <td>
                        <!-- Display status badge and text -->
                        <span :class="statusBadgeClass(student.status)">{{ statusText(student.status) }}</span>
                      </td>
                      <td>{{ student.timestamp }}</td>
                      <td>
                        <button class="btn btn-primary" @click="markAttendance(student.id)">
                          Mark Present
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Summary section -->
          <div class="mx-4">
            <div class="row">
              <div class="col-12 col-lg-12 col-xxl-12">
                <div class="text-start pt-3"><h5>Summary</h5></div>
                <div class="card border-0 bg-gray-400">
                  <div class="row">
                    <div class="col-4 pt-2 px-4">
                      <!-- Display total number of students -->
                      <p>Total students: {{ formOneStudents.length }}</p>
                    </div>
                    <div class="col-4 pt-2 px-4">
                      <!-- Display number of present students -->
                      <p>Present: {{ countStatus(true) }}</p>
                    </div>
                    <div class="col-4 pt-2 px-4">
                      <!-- Display number of absent students -->
                      <p>Absent: {{ countStatus(false) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!-- FooterSection component -->
      <FooterSection />
    </div>
  </div>
</template>

<style>
/* Add any additional styling if needed */
</style>
