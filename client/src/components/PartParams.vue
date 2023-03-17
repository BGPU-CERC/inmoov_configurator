<script setup>
let params = $ref({
  pin: 0,
  velocity: 0,
  position: 0,
  position_min: 0,
  position_max: 180,
  attach: false,
});
</script>

<template>
  {{ params }}

  <form>
    <label>
      <span>pin</span>
      <input v-model="params.pin" type="number" />
    </label>

    <label>
      <span>velocity</span>
      <input v-model="params.velocity" type="number" />
    </label>

    <label>
      <span>position: {{ params.position }}</span>
      <div class="row">
        <input v-model="params.position_min" type="number" />
        <input
          v-model="params.position"
          type="range"
          :min="params.position_min"
          :max="params.position_max"
          style="flex: 1"
        />
        <input v-model="params.position_max" type="number" />
      </div>
    </label>

    <label class="row">
      <span>attach?</span>
      <input
        v-model="params.attach"
        type="checkbox"
        style="transform: scale(2)"
      />
    </label>
  </form>
</template>
