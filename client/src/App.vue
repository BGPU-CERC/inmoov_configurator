<script setup>
import { init as initInmoovScene } from "inmoov_ik";
import inmoovScene from "inmoov_ik/inmoov.glb";

import { onMounted } from "vue";
import csv from "./assets/Inmoov.csv";
import PartTable from "./components/PartTable.vue";
import ServerToolbar from "./components/ServerToolbar.vue";

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

onMounted(async () => {
  await initInmoovScene("#inmoov_ik", inmoovScene);
});
</script>

<template>
  <server-toolbar></server-toolbar>
  <div class="row">
    <div class="col" style="min-width: 820px">
      <part-table :config="config"></part-table>
    </div>
    <div class="col">
      <div id="inmoov_ik"></div>
    </div>
  </div>
</template>

<style scoped>
#inmoov_ik {
  max-height: 85vh;
}
</style>
