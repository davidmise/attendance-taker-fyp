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
          <h1 class="h3 mb-3"><strong>Today's</strong> Attendance</h1>

          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
              <div class="card border-0 flex-fill">
                <div class="card-header">
                  <div class="row">
                    <div class="col"><h5 class="card-title mb-0">Date: DD/MM/YYYY</h5></div>
                    <div class="col"><h5 class="card-title mb-0">Class: From 3</h5></div>
                  </div>
                </div>
                <table class="table table-hover my-0">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <!-- <th>Date</th> -->
                      <th class="d-none d-xl-table-cell">Class</th>
                      <th class="d-none d-xl-table-cell">status</th>
                      <th>Time</th>
                      <!-- <th class="d-none d-md-table-cell">Actions</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Project Apollo</td>
                      <!-- <td clas/>s="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Project Fireball</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-danger">Absent</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Project Hades</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Project Nitro</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-warning">Late</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Project Phoenix</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Project X</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Project Romeo</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Project Wombat</td>
                      <!-- <td class="d-none d-xl-table-cell">01/01/2023</td> -->
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-warning">Late</span></td>
                      <td class="d-none d-md-table-cell">
                        <span class="badge bg-danger">Remove</span>
                      </td>
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
                    <div class="col-3 pt-2 px-4"><p>Total students:</p></div>
                    <div class="col-3 pt-2 px-4"><p>Present:</p></div>
                    <div class="col-3 pt-2 px-4"><p>Absent:</p></div>
                    <div class="col-3 pt-2 px-4"><p>Late:</p></div>
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
