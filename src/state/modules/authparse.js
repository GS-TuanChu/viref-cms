import { getParseServer } from '../../helpers/parseserver';

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        localStorage.setItem('currentUser', JSON.stringify(newValue));
    },

    REMOVE_CURRENT_USER() {
        localStorage.removeItem('currentUser');
    },
};
export const actions = {
    async logIn({ commit }, params = {}) {
        const user = await getParseServer().logIn(params);
        commit('SET_CURRENT_USER', user);
        return user;
    },

    async logout({ commit }) {
        commit('REMOVE_CURRENT_USER');
        return await getParseServer().logout();
    },
};
