<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <nav>
    <app-link
      v-for="route in routes"
      :to="route.path"
      :name="route.meta.name"
    ></app-link>
  </nav>
</template>
