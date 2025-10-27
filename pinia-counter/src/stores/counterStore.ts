import { defineStore } from 'pinia';

// ✅ Definição do estado com tipagem explícita
interface CounterState {
  count: number;
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0
  }),

  getters: {
    doubleCount: (state) => state.count * 2
  },

  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    },
    asyncIncrement() {
      setTimeout(() => {
        this.increment();
      }, 500);
    }
  }
});
