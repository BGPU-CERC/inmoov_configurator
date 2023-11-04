import { groupBy } from "lodash";
import { computed, ref } from "vue";
import { client } from "../client";

let params = ref({
  lt_port: null,
  rt_port: null,
  rate: 115200,
});

export function useSerial() {
  let ports = ref([]);

  let portsById = computed(() => {
    const map = groupBy(ports.value, "port_id");
    Object.keys(map).forEach((key) => (map[key] = map[key][0]));
    return map;
  });

  async function getPorts() {
    ports.value = await client.get(`/serial/ports`);
    ports.value = ports.value.map((el) => {
      const manufacturer = el.manufacturer && `(${el.manufacturer})`;
      const pnpId = el.pnpId && `pnpId: ${el.pnpId}`;
      const label = [el.path, manufacturer, pnpId].filter(Boolean).join(" ");
      return Object.assign(el, { value: el.path, label });
    });
    ports.value
      .filter((port) => port.port_id)
      .forEach((port) => (params.value[port.port_id] = port.path));
  }

  async function openPort(id) {
    const path = params.value[id];
    const port_params = { rate: params.value.rate, path };
    await client.put(`/serial/ports/${id}`, port_params);
  }

  async function openAllPorts() {
    await Promise.allSettled(["lt_port", "rt_port"].map(openPort));
    getPorts();
  }

  return {
    params,
    ports,
    portsById,
    getPorts,
    openAllPorts,
  };
}
