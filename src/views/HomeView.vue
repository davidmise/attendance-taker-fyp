<template>
  <div class="wrapper">
    <!-- Sidebar component -->
    <Sidebar />

    <div class="main">
      <!-- TopBar component -->
      <TopBar />

      <!-- Main content -->
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>

          <!-- Cards section -->
          <div class="row">
            <!-- Total Students Card -->
            <div class="col-sm-4">
              <div class="card border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Total Students</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="users"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">{{ summaryStore.getTotalStudents }}</h1>
                </div>
              </div>
            </div>

            <!-- Total Absent Card -->
            <div class="col-sm-4">
              <div class="card border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Total Absent</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="user-x"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">{{ summaryStore.getTotalAbsent }}</h1>
                </div>
              </div>
            </div>

            <!-- Total Present Card -->
            <div class="col-sm-4">
              <div class="card border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Total Present</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="user-check"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">{{ summaryStore.getTotalPresent }}</h1>
                </div>
              </div>
            </div>
          </div>

          <!-- Latest Projects table -->
          <div class="row mt-4">
            <div class="col-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">Latest Projects</h5>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th class="d-none d-xl-table-cell">Start Date</th>
                      <th class="d-none d-xl-table-cell">End Date</th>
                      <th>Status</th>
                      <th class="d-none d-md-table-cell">Assignee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project, index) in latestProjects" :key="index">
                      <td>{{ project.name }}</td>
                      <td class="d-none d-xl-table-cell">{{ project.startDate }}</td>
                      <td class="d-none d-xl-table-cell">{{ project.endDate }}</td>
                      <td>
                        <span :class="statusBadgeClass(project.status)">{{ project.status }}</span>
                      </td>
                      <td class="d-none d-md-table-cell">{{ project.assignee }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer section -->
      <FooterSection />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import { onMounted } from 'vue'
import { useSummaryStore } from '@/stores/counter'

// Create an instance of the summary store
const summaryStore = useSummaryStore()

// Fetch summary data when the component is mounted
onMounted(() => {
  summaryStore.fetchStudents()
})

// Function to determine the CSS class for status badges based on status
const statusBadgeClass = (status) => {
  switch (status) {
    case 'Present':
      return 'badge bg-success'
    case 'Absent':
      return 'badge bg-danger'
    case 'In progress':
      return 'badge bg-warning'
    case 'Done':
      return 'badge bg-info'
    default:
      return 'badge bg-secondary'
  }
}
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
