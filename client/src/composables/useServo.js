import { ref } from "vue";
import { client, socket } from "../client";

let params = ref({
  speed: 100,
  power: false,
});

async function togglePower() {
  const state = params.value.power ? 0 : 1;
  await client.post(`/serial/power`, { state });
  params.value.power = state;
}

async function setAngle(address, pin, angle, speed) {
  const params = { address, pin, angle, speed };
  socket.rpc("servo_set_angle", params);
}

export function useServo() {
  return {
    params,
    togglePower,
    setAngle,
  };
}
