<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Colors component
 */
export default {
  components: { Layout, PageHeader },
  page: {
    title: "Colors",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Colors",
      items: [
        {
          text: "UI Elements",
        },
        {
          text: "Colors",
          active: true,
        },
      ],
    };
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 font-size-18 text-center">Hex : #5b73e8</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-primary mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-primary</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-primary mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-primary</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-primary mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-primary</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #34c38f</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-success mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-success</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-success mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-success</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-success mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-success</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #50a5f1</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-info mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-info</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-info mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-info</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-info mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-info</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #f1b44c</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-warning mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-warning</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-warning mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-warning</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-warning mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-warning</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #f46a6a</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-danger mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-danger</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-danger mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-danger</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-danger mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-danger</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #343a40</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-dark mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-dark</h6>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-dark mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-dark</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-dark mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-dark</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #f5f6f8</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-light mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-light</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-light mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-light</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div class="avatar-md bg-light mx-auto rounded my-2"></div>
                  <h6 class="text-muted mt-3">bg-light</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-3 text-center">Hex : #74788d</h5>
            <div class="row">
              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-soft-secondary mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-soft-secondary</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-gradient-secondary mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-gradient-secondary</h6>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="text-center">
                  <div
                    class="avatar-md bg-secondary mx-auto rounded my-2"
                  ></div>
                  <h6 class="text-muted mt-3">bg-secondary</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
