import { computed, ref, watch } from "vue";
import { client } from "../client";

let params = ref({
  port: null,
  rate: 115200,
});

export function useSerial() {
  let ports = ref([]);

  let selectedPort = computed(() => {
    ports.value.find((p) => p.selected);
  });

  watch(selectedPort, (port) => {
    params.value.port = port.path;
  });

  async function getPorts() {
    ports.value = await client.get(`/serial/ports`);
    ports.value = ports.value.map((el) => {
      const manufacturer = el.manufacturer && `(${el.manufacturer})`;
      const pnpId = el.pnpId && `pnpId: ${el.pnpId}`;
      const label = [el.path, manufacturer, pnpId].filter(Boolean).join(" ");
      return Object.assign(el, { value: el.path, label });
    });
  }

  async function openPort() {
    const port_params = { rate: params.value.rate, path: params.value.port };
    await client.put(`/serial/port`, port_params);
    getPorts();
  }

  return {
    params,
    ports,
    selectedPort,
    getPorts,
    openPort,
  };
}
