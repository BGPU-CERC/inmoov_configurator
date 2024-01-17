<template>
  <form class="card" :onsubmit="onSubmit">
    <h2>Авторизация</h2>

    <label>
      <span>Password</span>
      <input v-model="form.token" type="password" required autofocus />
    </label>

    <button type="submit">Войти</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

const { login } = useAuth();
const form = ref({
  token: null,
})

function onSubmit(e) {
  e.preventDefault();
  login(form.value);
}
</script>

<style scoped>
form {
  width: 360px;
  margin: 0 auto;
  margin-top: 25vh;
  border: none;
}

h2 {
  margin-bottom: 0;
}
</style>
