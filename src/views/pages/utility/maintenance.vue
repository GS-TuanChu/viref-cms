<script>
import appConfig from "@/app.config";

/**
 * Maintenance component
 */
export default {
  layout: "auth",
  page: {
    title: "Maintenance",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Maintenance",
    };
  },
  mounted() {
    document.body.classList.add('authentication-bg')
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <router-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </router-link>
    </div>
    <div class="my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="home-wrapper">
              <router-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="@/assets/images/logo-dark.png"
                  alt
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo-light.png"
                  alt
                  height="22"
                  class="logo logo-light"
                />
              </router-link>

              <div class="row justify-content-center">
                <div class="col-lg-4 col-sm-5">
                  <div class="maintenance-img">
                    <img
                      src="@/assets/images/maintenance.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
              <h3 class="mt-5">Site is Under Maintenance</h3>
              <p>Please check back in sometime.</p>

              <div class="row">
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body p-4">
                      <div class="avatar-sm mx-auto mb-4">
                        <div
                          class="avatar-title rounded-circle bg-soft-primary text-primary font-size-20"
                        >
                          <i class="uil uil-cloud-wifi"></i>
                        </div>
                      </div>
                      <h5 class="font-size-15 text-uppercase">
                        Why is the Site Down?
                      </h5>
                      <p class="text-muted mb-0">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body p-4">
                      <div class="avatar-sm mx-auto mb-4">
                        <div
                          class="avatar-title rounded-circle bg-soft-primary text-primary font-size-20"
                        >
                          <i class="uil uil-clock"></i>
                        </div>
                      </div>
                      <h5 class="font-size-15 text-uppercase">
                        What is the Downtime?
                      </h5>
                      <p class="text-muted mb-0">
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mt-4 maintenance-box">
                    <div class="card-body p-4">
                      <div class="avatar-sm mx-auto mb-4">
                        <div
                          class="avatar-title rounded-circle bg-soft-primary text-primary font-size-20"
                        >
                          <i class="uil uil-envelope-alt"></i>
                        </div>
                      </div>
                      <h5 class="font-size-15 text-uppercase">
                        Do you need Support?
                      </h5>
                      <p class="text-muted mb-0">
                        If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything embar..
                        <a
                          href="mailto:no-reply@domain.com"
                          class="text-decoration-underline"
                          >no-reply@domain.com</a
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
            </div>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
  </div>
</template>
