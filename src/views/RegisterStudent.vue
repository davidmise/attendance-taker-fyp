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
                        <form @submit.prevent="registerStudent">
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
import { useStudentStore } from '@/stores/student';
import { mapActions, mapState } from 'pinia';

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
  computed: {
    ...mapState(useStudentStore, ['students'])
  },
  methods: {
    ...mapActions(useStudentStore, ['addStudent', 'fetchStudents']),
    async registerStudent() {
      const studentData = {
        id: this.studentOptions[this.selectedStudent].ID,
        name: this.newStudentName,
        Class: this.newStudentClass,
        RegNumber: this.RegNumber
      };

      try {
        await this.addStudent(studentData);

        this.newStudentName = '';
        this.newStudentClass = '';
        this.RegNumber = '';
      } catch (error) {
        console.error('Error registering student:', error);
      }
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
