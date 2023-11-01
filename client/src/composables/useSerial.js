import { ref } from "vue";
import { client } from "../client";

let params = ref({
  lt_port: null,
  rt_port: null,
  rate: 115200,
});

export function useSerial() {
  let ports = ref([]);

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

  function openAllPorts() {
    ["lt_port", "rt_port"].forEach((el) => {
      const port_params = { rate: params.value.rate, path: params.value[el] };
      client.put(`/serial/ports/${el}`, port_params);
    });
  }

  return {
    params,
    ports,
    getPorts,
    openAllPorts,
  };
}
