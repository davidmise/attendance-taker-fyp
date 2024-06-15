<script setup>
// Import necessary components and functions
import { useSummaryStore } from '@/stores/counter'
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { onMounted } from 'vue'
// Create an instance of the summary store
const summaryStore = useSummaryStore()

// Fetch students data when the component is mounted
onMounted(() => {
  summaryStore.fetchStudents()
})

// Function to determine the CSS class for status badges based on attendance status
const statusBadgeClass = (status) => {
  return {
    'badge bg-success': status === true,
    'badge bg-danger': status === false,
  }
}

// Function to convert status value to text
const statusText = (status) => {
  return status === true ? 'Present' : 'Absent'
}
</script>

<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main">
      <TopBar />

      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Today's</strong> Attendance</h1>

          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title mb-0">Date: {{ new Date().toLocaleDateString() }}</h5>
                    </div>
                    <div class="col">
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(student, index) in summaryStore.students" :key="index">
                      <td>{{ student.id }}</td>
                      <td>{{ student.name }}</td>
                      <td class="d-none d-xl-table-cell">{{ student.Class }}</td>
                      <td>
                        <span :class="statusBadgeClass(student.status)">{{ statusText(student.status) }}</span>
                      </td>
                      <td>{{ student.timestamp }}</td>
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
                <div class="text-center pt-3"><h5>Summary</h5></div>
                <div class="card border-0 bg-gray-400">
                  <div class="row">
                    <div class="col-3 pt-2 px-4">
                      <!-- Display total number of students -->
                      <p>Total students: {{ summaryStore.totalStudents }}</p>
                    </div>
                    <div class="col-3 pt-2 px-4">
                      <!-- Display number of present students -->
                      <p>Present: {{ summaryStore.totalPresent }}</p>
                    </div>
                    <div class="col-3 pt-2 px-4">
                      <!-- Display number of absent students -->
                      <p>Absent: {{ summaryStore.totalAbsent }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  </div>
</template>

<style>
/* Add any additional styling if needed */
</style>
