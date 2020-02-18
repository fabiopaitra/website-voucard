import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    statusTab: 'Registered',
  },
  getters: {
    changeStatus: (state) => {
      return state.statusTab;
    },
  },
  mutations: {
    registeredTab: (state) => {
      state.statusTab = 'Registered';
    },
    contactTab: (state) => {
      state.statusTab = 'Contact';
    },
    approvedTab: (state) => {
      state.statusTab = 'Approved';
    },
    refusedTab: (state) => {
      state.statusTab = 'Refused';
    },
  },
});
