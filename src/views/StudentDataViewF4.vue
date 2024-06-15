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
          <h1 class="h3 mb-3"><strong>Today's</strong> Attendance</h1>

          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <!-- Card to display student attendance table -->
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col">
                      <!-- Display current date -->
                      <h5 class="card-title mb-0">Date: {{ new Date().toLocaleDateString() }}</h5>
                    </div>
                    <div class="col">
                      <!-- Display class information -->
                      <h5 class="card-title mb-0">Class: Form 4</h5>
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

<script>
import Sidebar from '@/components/NavBar/SideBar.vue';
import TopBar from '@/components/NavBar/TopBar.vue';
import FooterSection from '@/components/FooterSection.vue';
import { ref, onValue } from 'firebase/database';
import { useAttendanceStore } from '@/stores/attendance';
import { database } from '@/firebase/init'

export default {
  components: {
    Sidebar,
    TopBar,
    FooterSection
  },
  data() {
    return {
      students: []
    };
  },
  setup() {
    const store = useAttendanceStore();

    const handleScan = (studentId) => {
      store.markAttendance(studentId);
    };

    return {
      handleScan,
    };
  },
  computed: {
    formOneStudents() {
      return this.students.filter(student => student.Class === 'Form 4');
    }
  },
  methods: {
    fetchStudents() {
      const studentsRef = ref(database, 'student');
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.students = [];
          for (const key in data) {
            if (data[key].Class === 'Form 4') {
              const attendanceInfo = data[key].attendance.info;
              this.students.push({
                id: key,
                name: data[key].name,
                Class: data[key].Class,
                status: attendanceInfo.present,
                timestamp: attendanceInfo.entryTime || 'N/A'
              });
            }
          }
        }
      });
    },
    statusBadgeClass(status) {
      return {
        'badge bg-success': status === true,
        'badge bg-danger': status === false,
      };
    },
    countStatus(status) {
      return this.formOneStudents.filter(student => student.status === status).length;
    },
    statusText(status) {
      return status === true ? 'Present' : 'Absent';
    },
    
  },

  created() {
    this.fetchStudents();
  }
};
</script>

<style>
/* Add any additional styling if needed */
</style>
