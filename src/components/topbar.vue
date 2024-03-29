<script>
import simplebar from 'simplebar-vue'
export default {
  components: {
    simplebar,
  },
  data() {
    return {
      languages: [
        {
          flag: require('@/assets/images/flags/us.jpg'),
          language: 'en',
          title: 'English',
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale)
    this.text = this.value.title
    this.flag = this.value.flag
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    /**
     * Toggle rightsidebar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale
      this.current_language = locale
      this.text = country
      this.flag = flag
    },
    logoutUser() {
      this.$store
        .dispatch('authparse/logout')
        .then(() => {
          this.$router.push({
            name: 'login',
          })
        })
        .catch((error) => console.log(error))
    },
  },
}
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="20" />
            </span>
          </router-link>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
          id="vertical-menu-btn"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown
          variant="white"
          class="d-inline-block d-lg-none ms-2"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <template v-slot:button-content>
            <i class="uil-search"></i>
          </template>
          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('navbar.search.text')"
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown>

        <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }"
          >
            <img
              :src="`${entry.flag}`"
              alt="user-image"
              class="me-1"
              height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
          variant="white"
          class="dropdown d-inline-block"
          toggle-class="header-item noti-icon"
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
        >
          <simplebar style="max-height: 230px" data-simplebar>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-primary rounded-circle font-size-16"
                  >
                    <i class="uil-shopping-basket"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t('navbar.dropdown.notification.order.title') }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t('navbar.dropdown.notification.order.text') }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.order.time') }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t('navbar.dropdown.notification.james.title') }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t('navbar.dropdown.notification.james.text') }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.james.time') }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-success rounded-circle font-size-16"
                  >
                    <i class="uil-truck"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t('navbar.dropdown.notification.item.title') }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t('navbar.dropdown.notification.item.text') }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.item.time') }}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t('navbar.dropdown.notification.salena.title') }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t('navbar.dropdown.notification.salena.text') }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t('navbar.dropdown.notification.salena.time') }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top">
            <div class="d-grid">
              <a
                class="btn btn-sm btn-link font-size-14 text-center"
                href="javascript:void(0)"
              >
                <i class="uil-arrow-circle-right me-1"></i>
                {{ $t('navbar.dropdown.notification.button') }}
              </a>
            </div>
          </div>
        </b-dropdown>

        <b-dropdown
          class="d-inline-block"
          toggle-class="header-item"
          right
          variant="white"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span
              class="d-none d-xl-inline-block ms-1 fw-medium font-size-15"
              >{{ $t('navbar.dropdown.marcus.text') }}</span
            >
            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </template>

          <a class="dropdown-item" href="#">
            <i
              class="uil uil-user-circle font-size-18 align-middle text-muted me-1"
            ></i>
            <span class="align-middle">{{
              $t('navbar.dropdown.marcus.list.profile')
            }}</span>
          </a>
          <a class="dropdown-item" @click="logoutUser">
            <i
              class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"
            ></i>
            <span class="align-middle">{{
              $t('navbar.dropdown.marcus.list.logout')
            }}</span>
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>
