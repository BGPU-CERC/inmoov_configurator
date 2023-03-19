<script setup>
import PartTable from "./components/PartTable.vue";
import ServerToolbar from "./components/ServerToolbar.vue";
</script>

<template>
  <server-toolbar></server-toolbar>
  <part-table></part-table>
</template>

<style scoped>
.part-table {
  align-self: flex-start;
}
</style>
