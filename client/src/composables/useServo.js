import { ref } from "vue";
import { client } from "../client";

let params = ref({
  speed: 100,
  power: false,
});

async function togglePower() {
  const state = params.value.power ? 0 : 1;
  await client.post(`/serial/power`, { state });
  params.value.power = state;
}

export function useServo() {
  return {
    params,
    togglePower,
  };
}
