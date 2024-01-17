<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes().find((r) => r.name === "main").children;
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
