<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Pricing component
 */
export default {
  page: {
    title: "Pricing",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Pricing",
      items: [
        {
          text: "Utility",
          href: "/",
        },
        {
          text: "Pricing",
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
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="text-center mb-5">
          <h4>Choose your Pricing plan</h4>
          <p class="text-muted mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo veritatis
          </p>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="row">
          <div class="col-xl-4">
            <div class="card pricing-box text-center">
              <div class="card-body p-4">
                <div>
                  <div class="mt-3">
                    <h5 class="mb-1">Starter</h5>
                    <p class="text-muted">Starter plans</p>
                  </div>

                  <div class="py-3">
                    <i class="uil uil-edit h1 text-primary"></i>
                  </div>
                </div>

                <ul class="list-unstyled plan-features mt-3">
                  <li>
                    Users:
                    <span class="text-primary fw-semibold">1</span>
                  </li>
                  <li>
                    Storage:
                    <span class="text-primary fw-semibold">01 GB</span>
                  </li>
                  <li>
                    Domain:
                    <span class="text-primary fw-semibold">No</span>
                  </li>
                  <li>
                    Support:
                    <span class="text-primary fw-semibold">No</span>
                  </li>
                  <li>
                    Setup:
                    <span class="text-primary fw-semibold">No</span>
                  </li>
                </ul>

                <div class="py-4">
                  <h3>
                    <sup><small>$</small></sup> 19/
                    <span class="font-size-13 text-muted">Per month</span>
                  </h3>
                </div>

                <div class="text-center plan-btn my-2">
                  <a href="#" class="btn btn-primary waves-effect waves-light"
                    >Sign up Now</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="card pricing-box text-center">
              <div class="card-body p-4">
                <div>
                  <div class="mt-3">
                    <h5 class="mb-1">Professional</h5>
                    <p class="text-muted">Professional plans</p>
                  </div>

                  <div class="py-3">
                    <i class="uil uil-medal h1 text-primary"></i>
                  </div>
                </div>

                <ul class="list-unstyled plan-features mt-3">
                  <li>
                    Users:
                    <span class="text-primary fw-semibold">3</span>
                  </li>
                  <li>
                    Storage:
                    <span class="text-primary fw-semibold">10 GB</span>
                  </li>
                  <li>
                    Domain:
                    <span class="text-primary fw-semibold">1</span>
                  </li>
                  <li>
                    Support:
                    <span class="text-primary fw-semibold">Yes</span>
                  </li>
                  <li>
                    Setup:
                    <span class="text-primary fw-semibold">No</span>
                  </li>
                </ul>

                <div class="py-4">
                  <h3>
                    <sup><small>$</small></sup> 29/
                    <span class="font-size-13 text-muted">Per month</span>
                  </h3>
                </div>

                <div class="text-center plan-btn my-2">
                  <a href="#" class="btn btn-primary waves-effect waves-light"
                    >Sign up Now</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4">
            <div class="card pricing-box text-center">
              <div class="card-body p-4">
                <div>
                  <div class="mt-3">
                    <h5 class="mb-1">Unlimited</h5>
                    <p class="text-muted">Unlimited plans</p>
                  </div>

                  <div class="py-3">
                    <i class="uil uil-layer-group h1 text-primary"></i>
                  </div>
                </div>

                <ul class="list-unstyled plan-features mt-3">
                  <li>
                    Users:
                    <span class="text-primary fw-semibold">5</span>
                  </li>
                  <li>
                    Storage:
                    <span class="text-primary fw-semibold">40 GB</span>
                  </li>
                  <li>
                    Domain:
                    <span class="text-primary fw-semibold">4</span>
                  </li>
                  <li>
                    Support:
                    <span class="text-primary fw-semibold">Yes</span>
                  </li>
                  <li>
                    Setup:
                    <span class="text-primary fw-semibold">Yes</span>
                  </li>
                </ul>

                <div class="py-4">
                  <h3>
                    <sup><small>$</small></sup> 49/
                    <span class="font-size-13 text-muted">Per month</span>
                  </h3>
                </div>

                <div class="text-center plan-btn my-2">
                  <a href="#" class="btn btn-primary waves-effect waves-light"
                    >Sign up Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
