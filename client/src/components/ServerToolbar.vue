<script setup>
import { client } from "../client";

let params = $ref({
  lt_port: {
    path: "COM1",
    rate: 115200,
  },
  rt_port: {
    path: "COM2",
    rate: 115200,
  },
});

let ports = $ref([]);

get();

async function get() {
  ports = await client.get(`/serial/ports`);
  ports = ports.map((el) => ({ value: el.path, label: el.path }));
  params.lt_port.path = ports[0].value;
  params.rt_port.path = ports[0].value;
}
</script>

<template>
  <div class="server-toolbar row">
    <label>
      <span>lt_port</span>
      <select v-model="params.lt_port.path">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
      <input v-model="params.lt_port.rate" type="number" />
    </label>
    <label>
      <span>rt_port</span>
      <select v-model="params.rt_port.path">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
      <input v-model="params.lt_port.rate" type="number" />
    </label>
  </div>
</template>

<style scoped>
.server-toolbar {
  border: 1px solid black;
  padding: 0.5rem;
}
</style>
