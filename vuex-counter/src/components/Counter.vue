<template>
  <div class="counter">
    <h1>Contador com Vuex</h1>
    <p>Valor: {{ count }}</p>
    <p>Dobro (getter): {{ doubleCount }}</p>

    <div class="buttons">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Resetar</button>
      <button @click="asyncIncrement">+ (assíncrono)</button>
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
    ...mapActions(['asyncIncrement'])
  }
};
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
