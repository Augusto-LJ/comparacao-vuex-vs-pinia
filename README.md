# 🔄 Comparativo: Vuex vs Pinia no Vue.js

Este repositório demonstra, na prática, as diferenças entre **[Vuex](https://vuex.vuejs.org)** e **[Pinia](https://pinia.vuejs.org)**, dois gerenciadores de estado amplamente usados no ecossistema Vue.js.

O objetivo é mostrar **como o Pinia é uma evolução natural do Vuex**, trazendo uma sintaxe mais simples, integração direta com a **Composition API**, e suporte nativo a **TypeScript**.

---

## 🧱 Estrutura do repositório
<pre>
📂 pinia-counter/
 ├─ 📂 src/
    ├─ 📂 stores/
        └─ 📜 counterStore.ts
    └─ 📂 components/
        └─ 📜 Counter.vue
📂 vuex-counter/
 ├─ 📂 src/
    ├─ 📂 store/
        └─ 📜 index.js
    └─ 📂 components/
        └─ 📜 Counter.vue
📜 README.md ← este arquivo
</pre>

- Cada pasta contém um projeto simples de contador para ilustrar como os dois gerenciadores funcionam.
---
## 🚀 Introdução ao Gerenciamento de Estado

Em aplicações Vue, componentes podem compartilhar dados usando **props** e **emits**.

### Exemplo básico:
```vue
<!-- Parent.vue -->
<template>
  <Counter :initial="10" @update="handleUpdate" />
</template>

<script setup>
import Counter from './Counter.vue'

function handleUpdate(newValue) {
  console.log('Novo valor:', newValue)
}
</script>

<!-- Counter.vue -->
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="emit('update', count + 1)">Incrementar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps<{ initial: number }>()
const emit = defineEmits(['update'])
const count = ref(props.initial)
</script>
```

<p>Esse padrão funciona bem em projetos pequenos, mas escala mal conforme mais componentes precisam acessar o mesmo estado. É aí que entram Vuex e Pinia.<p>
  
---

## 🏪 Vuex: o clássico gerenciador de estado
📄 store/index.js
```js
import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
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
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 500);
    }
  }
})
```

📄 Counter.vue
```vue
<template>
  <div class="counter">
    <h1>Contador com Vuex</h1>
    <p>Valor: {{ $store.state.count }}</p>
    <p>Dobro (getter): {{ $store.getters.doubleCount }}</p>

    <div>
      <button @click="$store.commit('increment')">+</button>
      <button @click="$store.commit('decrement')">-</button>
      <button @click="$store.commit('reset')">Resetar</button>
      <button @click="$store.dispatch('asyncIncrement')">+ (assíncrono)</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState(['count']),
      ...mapGetters(['doubleCount'])
    },
    methods: {
      ...mapMutations(['increment', 'decrement', 'reset']),
      ...mapState(['asyncIncrement']),
    }
};
</script>
```

⚙️ Características do Vuex
- Baseado em mutations e actions obrigatórias
- Estrutura verbosa
- Boilerplate (muito código para ações simples)
- Não foi feito originalmente com a Composition API em mente
- Tipagem TypeScript limitada

---

## 🌱 Pinia: a nova geração
📄 counterStore.ts
```ts
import { defineStore } from 'pinia';
import {ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  function asyncIncrement() {
    setTimeout(increment, 500);
  }

  return {count, doubleCount, increment, decrement, reset, asyncIncrement}
}
```

📄 Counter.vue
```vue
<template>
  <div class="counter">
    <h1>Contador com Pinia</h1>
    <p>Valor: {{ store.count }}</p>
    <p>Dobro (getter): {{ store.doubleCount }}</p>

    <div>
      <button @click="store.increment">+</button>
      <button @click="store.decrement">-</button>
      <button @click="store.reset">Resetar</button>
      <button @click="store.asyncIncrement">+ (assíncrono)</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/counterStore'

const store = useCounterStore()
</script>
```

⚙️ Características do Pinia
- Baseado na Composition API.
- Suporte nativo a TypeScript.
- Sem necessidade de mutations.
- Sintaxe limpa e intuitiva.
- Cada store é uma função reativa.
- Reatividade e hot reload automáticos.

> Em construção
