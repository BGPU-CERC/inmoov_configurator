<script setup>
const emit = defineEmits[("attach", "detach", "rest", "copy")];
</script>

<template>
  <div class="part-toolbar row">
    <button @click="emit('detach')">detach</button>
    <button @click="emit('attach')">attach</button>
    <button @click="emit('rest')">rest</button>
  </div>
</template>
