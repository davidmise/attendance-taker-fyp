<script setup>
import Sidebar from '@/components/NavBar/SideBar.vue'
import TopBar from '@/components/NavBar/TopBar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>
<template>
  <div class="wrapper">
    <Sidebar />

    <div class="main">
      <top-bar />

      <main class="content">
        <div class="container-fluid p-0">
          <h1 class="h3 mb-3"><strong>Add</strong> Students</h1>

          <div class="row">
            <div class="col-4 col-lg-4 col-xxl-4">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <h5 class="card-title mb-0">Register New Student</h5>
                </div>
                <!-- Button trigger modal -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add Student
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Register New Student</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <!-- Form for registering new student -->
                        <form>
                          <div class="mb-3">
                            <label for="studentName" class="form-label">Name:</label>
                            <input type="text" class="form-control" id="studentName" />
                          </div>
                          <div class="mb-3">
                            <label for="studentName" class="form-label">Class:</label>
                            <input type="text" class="form-control" id="studentName" />
                          </div>
                          <!-- Add more form fields for student details -->
                          <!-- Example: ID, Class, Date of Birth, etc. -->
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                        <button type="submit" class="btn btn-primary" form="registerForm">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer-section />
    </div>
  </div>
</template>
