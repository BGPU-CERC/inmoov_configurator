<script setup>
import { watch } from "vue";
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
getPorts();
watch(
  () => ports,
  () => {
    ports
      .filter((port) => port.port_id)
      .forEach((port) => (params[port.port_id].path = port.path));
  }
);

async function getPorts() {
  ports = await client.get(`/serial/ports`);
  ports = ports.map((el) => {
    const manufacturer = el.manufacturer && `(${el.manufacturer})`;
    const pnpId = el.pnpId && `pnpId: ${el.pnpId}`;
    const label = [el.path, manufacturer, pnpId].filter(Boolean).join(" ");
    return Object.assign(el, { value: el.path, label });
  });
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
    <label style="width: 150px">
      <span>lt_port</span>
      <select v-model="params.lt_port.path">
        <option v-for="port in ports" :value="port.value">
          {{ port.label }}
        </option>
      </select>
    </label>
    <label style="width: 150px">
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
