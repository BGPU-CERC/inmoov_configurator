<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <main class="row">
    <nav class="col card" style="max-width: 240px">
      <app-link
        v-for="route in routes"
        :to="route.path"
        :name="route.meta.name"
      ></app-link>
    </nav>
    <div class="col">
      <router-view></router-view>
    </div>
  </main>
</template>
