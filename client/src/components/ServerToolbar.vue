<script setup>
import { client } from "../client";

let params = $ref({
  rate: 115200,

  lt_port: {
    path: "COM1",
  },

  rt_port: {
    path: "COM2",
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

function onOpen() {
  ["lt_port", "rt_port"].forEach((el) => {
    const port_params = { rate: params.rate, ...params[el] };
    client.put(`/serial/ports/${el}`, port_params);
  });
}
</script>

<template>
  <div class="server-toolbar row card">
    <label>
      <span>lt_port</span>
      <select v-model="params.lt_port.path">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label>
      <span>rt_port</span>
      <select v-model="params.rt_port.path">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label style="width: 100px">
      <span>baud_rate</span>
      <input v-model="params.rate" type="number" />
    </label>

    <button @click="onOpen">OPEN</button>
  </div>
</template>

<style scoped></style>
