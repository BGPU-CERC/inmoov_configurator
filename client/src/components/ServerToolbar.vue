<script setup>
import { client } from "../client";

let params = $ref({
  lt_port: "COM1",
  rt_port: "COM2",
});

let ports = $ref([]);

get();

async function get() {
  ports = await client.get(`/serial/ports`);
  ports = ports.map((el) => ({ value: el.path, label: el.path }));
  params.lt_port = ports[0].value;
}
</script>

<template>
  <div class="server-toolbar row">
    <label>
      <span>lt_port</span>
      <select v-model="params.lt_port">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label>
      <span>rt_port</span>
      <select v-model="params.rt_port">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.server-toolbar {
  border: 1px solid black;
  padding: 0.5rem;
}
</style>
