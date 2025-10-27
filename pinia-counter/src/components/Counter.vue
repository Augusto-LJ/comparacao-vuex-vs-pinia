<template>
  <div class="counter">
    <h1>Contador com Pinia</h1>
    <p>Valor: {{ store.count }}</p>
    <p>Dobro (getter): {{ store.doubleCount }}</p>

    <div class="buttons">
      <button @click="store.increment">+</button>
      <button @click="store.decrement">-</button>
      <button @click="store.reset">Resetar</button>
      <button @click="store.asyncIncrement">+ (assíncrono)</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/counterStore';

const store = useCounterStore();
</script>

<style scoped>
.counter {
  text-align: center;
  font-family: sans-serif;
  margin-top: 50px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 16px;
}

p {
  font-size: 24px;
}
</style>
