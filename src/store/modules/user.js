import { SET_NAME } from './type.js';

const state = {
  userName: '',
};

const mutations = {
  [SET_NAME]: (state, userName) => {
    uni.setStorageSync('userName', userName);
    state.userName = userName;
  },
};
const actions = {
  setUserName({ commit }, userName) {
    commit('SET_NAME', userName);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
