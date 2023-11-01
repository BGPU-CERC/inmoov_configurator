<script setup>
import { useIK } from "../composables/useIK.js";
let { scene } = useIK("#inmoov_ik");
</script>

<template>
  <div id="inmoov_ik" class="card"></div>
</template>

<style scoped>
#inmoov_ik {
  width: 100%;
  height: 85vh;
}

:deep(#inmoov_ik canvas) {
  border-radius: 0.5rem;
}
</style>
