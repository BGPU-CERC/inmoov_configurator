<script setup>
import PartTable from "../components/PartTable.vue";
import { useParts } from "../composables/useParts";

let { parts } = useParts();
</script>

<template>
  <div class="card">
    <part-table :config="parts"></part-table>
  </div>
</template>
