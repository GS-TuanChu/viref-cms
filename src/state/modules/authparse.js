import { getParseServer } from '../../helpers/parseserver'

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    localStorage.setItem('currentUser', JSON.stringify(newValue))
  },

  REMOVE_CURRENT_USER() {
    localStorage.clear()
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
        const isUserAdmin = await getParseServer()
          .isAdmin({ uid: user.id })
          .catch((err) => console.log(err))
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
