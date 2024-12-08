<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useSerial } from "../composables/useSerial";
import { useServo } from "../composables/useServo";

let {
  params: port_params,
  ports,
  selectedPort,
  getPorts,
  openPort,
} = useSerial();

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

function styleOfPort() {
  return {
    width: "150px",
    color: selectedPort.value?.isOpen ? "blue" : undefined,
  };
}

function labelOfPort() {
  return selectedPort.value?.isOpen
    ? `port (${selectedPort.value.path?.split("/").reverse()[0]})`
    : "port";
}
</script>

<template>
  <div class="server-toolbar row card">
    <a-select
      v-model="port_params.port"
      :options="ports"
      :label="labelOfPort()"
      :style="styleOfPort()"
    ></a-select>

    <label style="width: 100px">
      <span>baud_rate</span>
      <input v-model="port_params.rate" type="number" />
    </label>

    <button @click="openPort">OPEN</button>

    <label style="margin-left: auto">
      <span>servo_speed</span>
      <input
        v-model.number="servo_params.speed"
        type="number"
        style="width: 5.5rem"
      />
    </label>
    <button
      @keydown.prevent
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
