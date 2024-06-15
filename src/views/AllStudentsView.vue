<script setup>
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { database } from '@/firebase/init'
import { ref, onValue } from 'firebase/database'
import { reactive, onMounted } from 'vue'

// Reactive state to store student data
const state = reactive({
  students: []
})

// Fetch students from Firebase
const fetchStudents = () => {
  const studentsRef = ref(database, 'student')
  onValue(studentsRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      state.students = []
      for (const key in data) {
        state.students.push({
          id: key,
          name: data[key].name,
          Class: data[key].Class,
          RegNumber: data[key].RegNumber || '',
          status: data[key].attendance
        })
      }
    }
  })
}

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
// Function to convert status value to text
const statusText = (status) => {
  console.log(status)
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
          <h1 class="h3 mb-3"><strong>ALL</strong> Students</h1>
          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">Student Information</h5>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th class="d-none d-xl-table-cell">Class</th>
                      <th class="d-none d-xl-table-cell">RegNumber</th>
                      <th>Status</th>
                      <!-- <th class="d-none d-md-table-cell">Actions</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(student, index) in state.students" :key="index">
                      <td>{{ student.id }}</td>
                      <td>{{ student.name }}</td>
                      <td class="d-none d-xl-table-cell">{{ student.Class }}</td>
                      <td class="d-none d-xl-table-cell">{{ student.RegNumber }}</td>
                      <td>
                        <span :class="statusBadgeClass(student.status)">{{ statusText(student.status)}}</span>
                      </td>
                      
                    </tr>
                  </tbody>
                </table>
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
