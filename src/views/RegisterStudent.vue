<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <TopBar />
      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Students </strong>Data</h1>
          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="container mt-4">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addStudentModal"
                >
                  Add Student
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="addStudentModal"
                  tabindex="-1"
                  aria-labelledby="addStudentModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="addStudentModalLabel">Add/Update Student</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="addStudent">
                          <div class="mb-3">
                            <label for="selectedStudent" class="form-label">Select Student:</label>
                            <select
                              v-model="selectedStudent"
                              id="selectedStudent"
                              class="form-select"
                              required
                            >
                              <option
                                v-for="(student, key) in studentOptions"
                                :key="key"
                                :value="key"
                              >
                                {{ student.name ? student.name : key }}
                              </option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <input
                              type="text"
                              v-model="newStudentName"
                              class="form-control"
                              placeholder="Enter student name"
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <input
                              type="text"
                              v-model="newStudentClass"
                              class="form-control"
                              placeholder="Enter student Class"
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <input
                              type="text"
                              v-model="RegNumber"
                              class="form-control"
                              placeholder="Enter RegNumber"
                              required
                            />
                          </div>
                          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <ol class="list-group list-group-numbered mt-4">
                  <li v-for="(student, index) in students" :key="index" class="list-group-item">
                    Name: {{ student.name }} and Class: {{ student.Class }} Reg number:
                    {{ student.RegNumber }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/NavBar/SideBar.vue';
import TopBar from '@/components/NavBar/TopBar.vue';
import FooterSection from '@/components/FooterSection.vue';
import { database } from '@/firebase/init';
import { ref,set, onValue } from 'firebase/database'

import $ from 'jquery';


export default {
  components: {
    Sidebar,
    TopBar,
    FooterSection
  },
  data() {
    return {
      students: [],
      newStudentName: '',
      newStudentClass: '',
      RegNumber: '',
      selectedStudent: 'student1',
      studentOptions: {
        student1: { ID: '63e3601a' },
        student2: { ID: '93c6c40e' }
      }
    };
  },
  methods: {
    async addStudent() {
      try {
        const studentRef = ref(database ,`student/${this.selectedStudent}`); // Assuming 'student' is your Firebase collection

        set(studentRef,{
          ID: this.studentOptions[this.selectedStudent].ID,
          name: this.newStudentName,
          Class: this.newStudentClass,
          RegNumber: this.RegNumber,
          entryDate: this.getCurrentDate(), // Capture current date
          entryTime: this.getCurrentTime()  // Capture current time
        })

        // // Push the new student data to Firebase
        // await studentRef.push(newStudent);

        // // Update the local students array if needed (optional)
        // this.students.push(newStudent);

        // Clear the form inputs
        this.newStudentName = '';
        this.newStudentClass = '';
        this.RegNumber = '';

        // Close the modal or provide feedback as needed
        $('#addStudentModal').modal('hide');
      } catch (error) {
        console.error('Error adding student:', error);
        // Handle error gracefully (show message, log, etc.)
      }
    },
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();

      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    },
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    },
    fetchStudents() {
      const studentsRef = ref(database, 'student');

      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          this.students = Object.values(data).map(student => ({
            name: student.name,
            Class: student.Class,
            RegNumber: student.RegNumber
          }));
        }
      }, (error) => {
        console.error('Error fetching students:', error);
        // Handle error gracefully (show message, log, etc.)
      });
    }
  },
  created() {
    this.fetchStudents();
  }
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
