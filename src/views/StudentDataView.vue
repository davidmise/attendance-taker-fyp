<script setup>
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { database } from '@/firebase/init'
import { ref, onValue } from 'firebase/database'
import { reactive, computed, onMounted } from 'vue'

const state = reactive({
  students: []
})

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
            status: data[key].status || 'Absent',
            timestamp: data[key].timestamp || ''
          })
        }
      }
    }
  })
}

const formOneStudents = computed(() => state.students)

onMounted(() => {
  fetchStudents()
})

const statusBadgeClass = (status) => {
  return {
    'badge bg-success': status === 'Present',
    'badge bg-danger': status === 'Absent',
    'badge bg-warning': status === 'Late'
  }
}

const countStatus = (status) => {
  return formOneStudents.value
    ? formOneStudents.value.filter((student) => student.status === status).length
    : 0
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
                    <div class="col"><h5 class="card-title mb-0">Class: Form 1</h5></div>
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
                    <tr v-for="(student, index) in formOneStudents" :key="index">
                      <td>{{ student.id }}</td>
                      <td>{{ student.name }}</td>
                      <td class="d-none d-xl-table-cell">{{ student.Class }}</td>
                      <td>
                        <span :class="statusBadgeClass(student.status)">{{ student.status }}</span>
                      </td>
                      <td>{{ student.timestamp }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="mx-4">
            <div class="row">
              <div class="col-12 col-lg-12 col-xxl-12">
                <div class="text-center pt-3"><h5>Summary</h5></div>
                <div class="card border-0 bg-gray-400">
                  <div class="row">
                    <div class="col-3 pt-2 px-4">
                      <p>Total students: {{ formOneStudents.length }}</p>
                    </div>
                    <div class="col-3 pt-2 px-4">
                      <p>Present: {{ countStatus('Present') }}</p>
                    </div>
                    <div class="col-3 pt-2 px-4">
                      <p>Absent: {{ countStatus('Absent') }}</p>
                    </div>
                    <div class="col-3 pt-2 px-4">
                      <p>Late: {{ countStatus('Late') }}</p>
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
