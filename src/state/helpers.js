import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader,
  }),
}

export const userComputed = {
  ...mapGetters('user', ['users', 'user']),
}

export const authMethods = mapActions('auth', [
  'logIn',
  'logOut',
  'register',
  'resetPassword',
])

export const layoutMethods = mapActions('layout', [
  'changeLayoutType',
  'changeLayoutWidth',
  'changeLeftSidebarType',
  'changeTopbar',
  'changeLoaderValue',
])

export const authFackMethods = mapActions('authfack', [
  'login',
  'registeruser',
  'logout',
])

export const notificationMethods = mapActions('notification', [
  'success',
  'error',
  'clear',
])

export const authParseMethods = mapActions('authparse', ['logIn'])

export const userMethods = mapActions('user', ['fetchUsers', 'updateUser'])
