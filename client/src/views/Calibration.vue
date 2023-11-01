<script setup>
import csv from "../assets/Inmoov.csv";
import PartTable from "../components/PartTable.vue";
import ServerToolbar from "../components/ServerToolbar.vue";

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
</script>

<template>
  <div class="col">
    <server-toolbar></server-toolbar>
    <div class="card">
      <part-table :config="config"></part-table>
    </div>
  </div>
</template>
