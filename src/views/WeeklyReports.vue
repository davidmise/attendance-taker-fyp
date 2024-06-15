<template>
    <div class="wrapper">
      <Sidebar />
      <div class="main">
        <TopBar />
        <main class="content">
          <div class="container-fluid p-0">
            <!-- <h1 class="h3 mb-3"><strong>Weekly</strong> Reports</h1> -->
  
            <!-- Date range selector -->
            <div>
              <h1>Student Reports</h1>
              <p>Total Students: {{ totalStudents }}</p>
  
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Registration Number</th>
                    <th>Time</th>
                    <!-- <th>Stauts</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student in students" :key="student.id">
                    <td>{{ student.id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.Class }}</td>
                    <td>{{ student.RegNumber }}</td>
                    <td>{{ student.entryTime }}</td>
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
  
  export default {
    components: {
      Sidebar,
      TopBar,
      FooterSection
    },
    setup() {
      const { fetchStudents, getAllStudents, totalStudents } = useWeeklyReportStore();
  
      fetchStudents();
  
      return {
        students: getAllStudents,
        totalStudents,
      };
    },
  }
  </script>
  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>
  