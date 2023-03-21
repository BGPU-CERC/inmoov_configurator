<script setup>
import PartTable from "./components/PartTable.vue";
import ServerToolbar from "./components/ServerToolbar.vue";
import csv from "./assets/Inmoov.csv";
import { client } from "./client";

let config = $ref(csv);

config.forEach((el, i, arr) => {
  const prev = arr[i - 1];
  el.group = el.group || prev?.group;
  el.current_value = el.rest;
});

config = config.filter((el) => {
  const values = Object.values(el);
  values.shift();
  return values.join("").trim().length;
});

function onStop() {
  client.post(`/serial/stop`);
}
</script>

<template>
  <server-toolbar></server-toolbar>
  <part-table :config="config" @stop="onStop"></part-table>
</template>

<style scoped>
.part-table {
  align-self: flex-start;
}
</style>
