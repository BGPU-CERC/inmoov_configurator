import * as gamepad from "inmoov_ik/gamepad";
import { init as initInmoovScene, mapLinear } from "inmoov_ik";
import inmoovScene from "inmoov_ik/inmoov.glb";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useParts } from "./useParts";
import { useServo } from "./useServo";

let { params: servo_params, setAngle } = useServo();
let { partsByName } = useParts();

let keyMap = undefined;

export function useIK(sceneContainerSelector) {
  let scene = ref();
  let sceneCreating = ref(false);

  const interval = 1000 / 5;
  let timer = -1;

  const rotationMap = ref({});
  const watchers = new Set();

  onMounted(async () => {
    await initScene();
    await new Promise((res) => setTimeout(res, 1 * 1000)); // fixme: here waiting for ik to resolve
    startLoop();
  });

  onBeforeUnmount(() => {
    stopLoop();
  });

  async function initScene() {
    if (scene.value) return;
    if (sceneCreating.value) return;

    try {
      sceneCreating.value = true;
      scene.value = await initInmoovScene(sceneContainerSelector, inmoovScene);
      gamepad.controlScene(scene.value);
      keyMap = Object.keys(getRotationMap()).reduce((map, entry) => {
        const [part, side] = entry.split("_");
        map[entry] = { part, port_id: side === "r" ? "rt_port" : "lt_port" };
        return map;
      }, {});
    } finally {
      sceneCreating.value = false;
    }
  }

  function getRotationMap() {
    return Object.assign(rotationMap.value, scene.value.getRotationMap());
  }

  // todo: remove number parsing
  function mapToServo(key, value) {
    let { part, port_id } = keyMap[key];
    let { pin, min, max } = partsByName.value[part];

    setAngle(
      port_id,
      Number(pin),
      Math.round(mapLinear(value, 0, 1, Number(min), Number(max))),
      servo_params.value.speed
    );
  }

  function startLoop() {
    Object.keys(rotationMap.value).forEach((key) => {
      const stop = watch(
        () => rotationMap.value[key],
        (value) => mapToServo(key, value)
      );
      watchers.add(stop);
    });

    timer = setInterval(() => {
      getRotationMap();
    }, interval);
  }

  function stopLoop() {
    watchers.forEach((stop) => stop());
    watchers.clear();
    clearInterval(timer);
  }

  return {
    scene,
    sceneCreating,
  };
}
