<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useSerial } from "../composables/useSerial";
import { useServo } from "../composables/useServo";

let { params: ports_params, ports, getPorts, openAllPorts } = useSerial();
let { params: servo_params, togglePower } = useServo();

getPorts();

onMounted(() => {
  window.removeEventListener("keydown", togglePowerOnSpace);
  window.addEventListener("keydown", togglePowerOnSpace);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", togglePowerOnSpace);
});

function togglePowerOnSpace(event) {
  if (event.code === "Space") {
    togglePower();
  }
}
</script>

<template>
  <div class="server-toolbar row card">
    <label style="width: 150px">
      <span>lt_port</span>
      <select v-model="ports_params.lt_port">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label style="width: 150px">
      <span>rt_port</span>
      <select v-model="ports_params.rt_port">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label style="width: 100px">
      <span>baud_rate</span>
      <input v-model="ports_params.rate" type="number" />
    </label>

    <button @click="openAllPorts">OPEN</button>

    <label style="margin-left: auto">
      <span>servo_speed</span>
      <input
        v-model.number="servo_params.speed"
        type="number"
        style="width: 5.5rem"
      />
    </label>
    <button
      @click="togglePower()"
      :class="servo_params.power ? 'power error' : 'power ok'"
      title="(Space)"
    >
      {{ servo_params.power ? "STOP" : "START" }}
    </button>
  </div>
</template>

<style scoped>
button.power {
  font-size: 2rem;
  height: 3rem;
  min-width: 8rem;
  border-radius: 0.5rem;
}
</style>
