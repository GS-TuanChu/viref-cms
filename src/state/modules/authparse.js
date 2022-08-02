import { getParseServer } from '../../helpers/parseserver'

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    localStorage.setItem('currentUser', JSON.stringify(newValue))
  },

  REMOVE_CURRENT_USER() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAdmin')
  },

  SET_ISADMIN(state, newValue) {
    localStorage.setItem('isAdmin', JSON.stringify(newValue))
  },
}
export const actions = {
  async logIn({ commit }, params = {}) {
    try {
      const user = await getParseServer().logIn(params)
      let isAdmin = false
      if (user) {
        const isUserAdmin = await getParseServer().isAdmin({ uid: user.id })
        if (isUserAdmin) isAdmin = true
      }
      commit('SET_CURRENT_USER', user)
      commit('SET_ISADMIN', isAdmin)
      return user
    } catch (err) {
      console.log(err)
    }
  },

  async logout({ commit }) {
    commit('REMOVE_CURRENT_USER')
    return await getParseServer().logout()
  },
}
