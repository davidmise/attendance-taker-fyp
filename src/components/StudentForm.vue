<template>
  <div class="container mt-4">
    <h1>Students Data</h1>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addStudentModal"
    >
      Add/Update Student
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
                <select v-model="selectedStudent" id="selectedStudent" class="form-select" required>
                  <option v-for="(student, key) in studentOptions" :key="key" :value="key">
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
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <ol class="list-group list-group-numbered mt-4">
      <li v-for="(student, index) in students" :key="index" class="list-group-item">
        Name: {{ student.name }} and Class: {{ student.Class }}
      </li>
    </ol>
  </div>
</template>

<script>
import { database } from '@/firebase/init'
import { ref, onValue, set } from 'firebase/database'

export default {
  data() {
    return {
      students: [],
      newStudentName: '',
      newStudentClass: '',
      selectedStudent: 'student1',
      studentOptions: {
        student1: { ID: '63e3601a' },
        student2: { ID: '93c6c40e' }
      }
    }
  },
  created() {
    this.fetchStudents()
  },
  methods: {
    fetchStudents() {
      const studentsRef = ref(database, 'student')
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          for (const key in data) {
            if (data[key].name && data[key].Class) {
              this.students.push({
                id: key,
                name: data[key].name,
                Class: data[key].Class
              })
            }
          }
        }
      })
    },
    addStudent() {
      const studentRef = ref(database, `student/${this.selectedStudent}`)
      set(studentRef, {
        ID: this.studentOptions[this.selectedStudent].ID,
        name: this.newStudentName,
        Class: this.newStudentClass
      })
        .then(() => {
          this.newStudentName = ''
          this.newStudentClass = ''
        })
        .catch((error) => {
          console.error('Error adding student: ', error)
        })
    }
  }
}
</script>

<style>
/* Add any additional styling if needed */
</style>
