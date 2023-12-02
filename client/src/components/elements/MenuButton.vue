<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const cssClass = computed(() => {
  return {
    active: props.modelValue,
  };
});

function toggle() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <button @click="toggle" class="card" :class="cssClass">
    <div></div>
    <div></div>
    <div></div>
  </button>
</template>

<style scoped>
button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;
  border: none;
}

div {
  width: 35px;
  height: 4px;
  background-color: black;
  border-radius: 2px;
}

button.active div {
  background-color: blue;
}
</style>
