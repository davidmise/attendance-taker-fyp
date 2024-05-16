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
          <h1 class="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>

          <div class="row">
            <div class="col-xl-12 col-xxl-12 col-sm-12 col-md-12 col-lg-12 d-flex">
              <div class="w-100">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="card border-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Total Students</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="truck"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">382</h1>
                        <!-- <div class="mb-0">
													<span class="text-danger"> <i class="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
													<span class="text-muted">Since last week</span>
												</div> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card border-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Total Absent</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="users"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">14</h1>
                        <!-- <div class="mb-0">
													<span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
													<span class="text-muted">Since last week</span>
												</div> -->
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="card border-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Total Present</h5>
                          </div>
                          <div class="col-sm-4">
                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="dollar-sign"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">120</h1>
                        <!-- <div class="mb-0">
													<span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
													<span class="text-muted">Since last week</span>
												</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12 col-xxl-12">
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
                    <tr>
                      <td>Project Apollo</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">Vanessa Tucker</td>
                    </tr>
                    <tr>
                      <td>Project Fireball</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-danger">Absent</span></td>
                      <td class="d-none d-md-table-cell">William Harris</td>
                    </tr>
                    <tr>
                      <td>Project Hades</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">Sharon Lessman</td>
                    </tr>
                    <tr>
                      <td>Project Nitro</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-warning">In progress</span></td>
                      <td class="d-none d-md-table-cell">Vanessa Tucker</td>
                    </tr>
                    <tr>
                      <td>Project Phoenix</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Done</span></td>
                      <td class="d-none d-md-table-cell">William Harris</td>
                    </tr>
                    <tr>
                      <td>Project X</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">Sharon Lessman</td>
                    </tr>
                    <tr>
                      <td>Project Romeo</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-success">Present</span></td>
                      <td class="d-none d-md-table-cell">Christina Mason</td>
                    </tr>
                    <tr>
                      <td>Project Wombat</td>
                      <td class="d-none d-xl-table-cell">01/01/2023</td>
                      <td class="d-none d-xl-table-cell">31/06/2023</td>
                      <td><span class="badge bg-warning">In progress</span></td>
                      <td class="d-none d-md-table-cell">William Harris</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer-section />
    </div>
  </div>
</template>
