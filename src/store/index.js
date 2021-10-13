import Vue from 'vue';
import Vuex from 'vuex';

import CreatePersistedState from 'vuex-persistedstate';

import user from './modules/user.js';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
  plugins: [
    CreatePersistedState({
      storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: (key) => uni.removeStorageSync(key),
      },
    }),
  ],
});

export default store;
