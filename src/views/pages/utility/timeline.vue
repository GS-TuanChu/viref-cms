<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { Carousel, Slide } from "vue-carousel";

/**
 * Timeline component
 */
export default {
  page: {
    title: "Timeline",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    Carousel,
    Slide,
  },
  data() {
    return {
      title: "Timeline",
      items: [
        {
          text: "Utility",
          href: "/",
        },
        {
          text: "Timeline",
          active: true,
        },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
    },
    prevSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Horizontal Timeline</h4>

            <div class="hori-timeline">
              <carousel
                ref="carousel"
                class="events navs-carousel"
                id="timeline-carousel"
                :navigation-enabled="false"
                :pagination-enabled="false"
                :perPageCustom="[
                  [480, 2],
                  [768, 4],
                ]"
              >
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">03 May</div>
                    </div>

                    <div class="px-3">
                      <h5>First event</h5>
                      <p class="text-muted">
                        If several languages coalesce, the grammar of the
                        resulting the individual
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">08 May</div>
                    </div>

                    <div class="px-3">
                      <h5>Second event</h5>
                      <p class="text-muted">
                        Sed ut perspiciatis unde omnis iste natus error sit illo
                        inventore veritatis
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">11 May</div>
                    </div>

                    <div class="px-3">
                      <h5>Third event</h5>
                      <p class="text-muted">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                        aut odit aut fugit
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">16 May</div>
                    </div>

                    <div class="px-3">
                      <h5>Fourth event</h5>
                      <p class="text-muted">
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse quam
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">23 May</div>
                    </div>

                    <div class="px-3">
                      <h5>Fifth event</h5>
                      <p class="text-muted">
                        Itaque earum rerum hic tenetur a sapiente delectus
                        maiores alias consequatur aut
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide>
                  <div class="item event-list">
                    <div class="event-date">
                      <div class="text-primary">27 May</div>
                    </div>

                    <div class="px-3">
                      <h5>Sixth event</h5>
                      <p class="text-muted">
                        Donec quam felis ultricies nec pellentesque eu pretium
                        sem consequat quis
                      </p>
                      <div>
                        <a href="#">
                          View more
                          <i class="uil uil-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </slide>
              </carousel>
              <div class="owl-nav">
                <button
                  type="button"
                  role="presentation"
                  class="owl-prev"
                  @click.prevent="prevSlide"
                >
                  <i class="mdi mdi-chevron-left"></i>
                </button>
                <button
                  type="button"
                  role="presentation"
                  class="owl-next"
                  @click.prevent="nextSlide"
                >
                  <i class="mdi mdi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-5">Vertical Timeline</h4>
            <div class>
              <ul class="verti-timeline list-unstyled">
                <li class="event-list">
                  <div class="event-date text-primar">03 May</div>
                  <h5>Timeline event One</h5>
                  <p class="text-muted">
                    If several languages coalesce, the grammar of the resulting
                    the individual
                  </p>
                </li>
                <li class="event-list">
                  <div class="event-date text-primar">08 May</div>
                  <h5>Timeline event Two</h5>
                  <p class="text-muted">
                    Sed ut perspiciatis unde omnis iste natus error sit illo
                    inventore veritatis
                  </p>
                </li>
                <li class="event-list">
                  <div class="event-date text-primar">11 May</div>
                  <h5>Timeline event Three</h5>
                  <p class="text-muted">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit
                  </p>
                </li>
                <li class="event-list">
                  <div class="event-date text-primar">16 May</div>
                  <h5>Timeline event Four</h5>
                  <p class="text-muted">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam
                  </p>
                </li>
                <li class="event-list">
                  <div class="event-date text-primar">27 May</div>
                  <h5>Timeline event Five</h5>
                  <p class="text-muted">
                    Itaque earum rerum hic tenetur a sapiente delectus maiores
                    alias consequatur aut
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
</style>
