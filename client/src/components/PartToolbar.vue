<script setup>
const emit = defineEmits(["attach", "detach", "copy"]);

const params = $ref({
  copy_from: "rest",
  copy_to: "current_value",
});

const copyOptions = [
  { value: "rest", label: "rest" },
  { value: "current_value", label: "curr" },
  { value: "min", label: "min" },
  { value: "max", label: "max" },
];

function onCopy() {
  emit("copy", { from: params.copy_from, to: params.copy_to });
}

function onSwap() {
  let temp = params.copy_from;
  params.copy_from = params.copy_to;
  params.copy_to = temp;
}
</script>

<template>
  <div class="part-toolbar row">
    <button @click="emit('detach')">detach</button>
    <button @click="emit('attach')">attach</button>

    <div class="copy row" style="margin-left: auto">
      <button @click="onCopy">copy</button>
      <label>
        <span>from</span>
        <select v-model="params.copy_from">
          <option v-for="option in copyOptions" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>
      <button @click="onSwap" class="swap" title="swap">⇄</button>
      <label>
        <span>to</span>
        <select v-model="params.copy_to">
          <option v-for="option in copyOptions" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.copy {
  gap: 0.5rem;
}

.swap {
  font-size: 1.5rem;
  line-height: 1rem;
  height: 1.75rem;
  padding: 0 0.25rem;
  margin-top: auto;
}
</style>
