import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    reset(state) {
      state.count = 0;
    },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 500);
    },
  },
});
