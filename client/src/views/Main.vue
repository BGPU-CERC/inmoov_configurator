<script setup>
import { ref, watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useBreakpoints } from "@/composables/useBreakpoints";

import AppNav from "@/components/AppNav.vue";
import MenuButton from "@/components/elements/MenuButton.vue";
import ServerToolbar from "@/components/ServerToolbar.vue";

const showNav = ref(true);
const { breakpoints } = useBreakpoints();
watch(breakpoints, (bp) => (showNav.value = !bp.md));

const { logout } = useAuth();
</script>

<template>
  <header class="row">
    <MenuButton v-model="showNav" />
    <server-toolbar style="flex: 1"></server-toolbar>
    <button class="card" @click="logout">Выйти</button>
  </header>
  <main class="row">
    <app-nav v-if="showNav" class="col card" style="max-width: 240px"></app-nav>
    <div class="col">
      <router-view></router-view>
    </div>
  </main>
</template>
