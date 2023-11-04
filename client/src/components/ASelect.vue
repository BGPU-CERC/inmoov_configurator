<script setup>
defineProps(["modelValue", "options", "label"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <label>
    <span>{{ label }}</span>
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
