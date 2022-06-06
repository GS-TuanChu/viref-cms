import { getParseServer } from '../../helpers/parseserver'

// const map = new Map()

export const state = {
  users: [],
  total: 0,
  skip: JSON.parse(localStorage.getItem('skip')) || 0,
}

export const mutations = {
  // eslint-disable-next-line no-unused-vars
  SET_USERS(state, newValue) {
    state.users[newValue.payload.page - 1] = newValue.response.users
  },

  SET_UPDATE_USER(state, newValue) {
    const newObject = {
      id: newValue.user.id,
      username: newValue.user.get('username'),
      email: newValue.user.get('email'),
      phone: newValue.user.get('phone'),
      roles: newValue.roles.sort(),
      bankAccount: newValue.user.get('bankAccount'),
      balanceToken: newValue.user.get('balanceToken'),
      balance: newValue.user.get('balance'),
    }
    let index = state.users.findIndex((u) => u.id === newObject.id)
    if (index) {
      state.users[index] = newObject
    }
    localStorage.setItem('users', JSON.stringify(state.users))
  },

  SET_UPDATE_USER_LOCAL(state, { id, params }) {
    let index = state.users.findIndex((u) => u && u.id === id)
    if (index) {
      state.users[index] = params
    }
    localStorage.setItem('users', JSON.stringify(state.users))
  },

  SET_SKIP(state, newValue) {
    state.skip = newValue
    localStorage.setItem('skip', state.skip)
  },
  SET_TOTAL(state, newValue) {
    state.total = newValue
  },
}

export const getters = {
  users() {
    return state.users
  },

  user: () => (uid) => {
    return state.users.filter((u) => u.id === uid)[0]
  },

  total() {
    return state.total
  },
}

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async fetchUsers({ commit, getters, dispatch }, payload) {
    return getParseServer()
      .getUserList({ limit: payload.limit, skip: payload.skip })
      .then((response) => {
        response.users = constructUserObject(response.users)
        commit('SET_USERS', { response, payload })
        commit('SET_TOTAL', response.total)
      })
  },

  async updateUser({ commit }, payload) {
    commit('SET_UPDATE_USER_LOCAL', payload)
  },

  // updateUserMap() {
  //   state.users.forEach((u) => {
  //     map.set(u.id, {
  //       id: u.id,
  //       username: u.username,
  //       email: u.email,
  //       phone: u.phone,
  //       roles: u.roles,
  //       bankAccount: u.bankAccount,
  //       balanceToken: u.balanceToken,
  //       balance: u.balance,
  //     })
  //   })
  // },

  // getMoreUsers({ commit, dispatch }) {
  //   if (state.users.length > 2000) return
  //   const params = {
  //     limit: 100,
  //     skip: state.skip + 100,
  //   }
  //   commit('SET_SKIP', params.skip)
  //   return Promise.resolve(
  //     getParseServer()
  //       .getUserList(params)
  //       .then((res) => {
  //         if (res) {
  //           const dataUsers = constructUserObject(res)
  //           commit('SET_USERS', dataUsers)
  //           dispatch('updateUserMap')
  //         }
  //       })
  //   )
  // },
}

function constructUserObject(data) {
  return data.map((dataUser) => {
    return {
      id: dataUser.user.id,
      username: dataUser.user.get('username'),
      fullname: dataUser.user.get('fullname'),
      email: dataUser.user.get('email'),
      phone: dataUser.user.get('phone'),
      roles: dataUser.roles.sort(),
      bankAccount: dataUser.user.get('bankAccount'),
      balanceToken: dataUser.user.get('balanceToken'),
      balance: dataUser.user.get('balance'),
    }
  })
}
