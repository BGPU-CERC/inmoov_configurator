import { init as initInmoovScene } from "inmoov_ik";
import inmoovScene from "inmoov_ik/inmoov.glb";
import { groupBy } from "lodash";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useParts } from "./useParts";
import { useServo } from "./useServo";

let { params: servo_params, setAngle } = useServo();
let { parts } = useParts();

let partsByName = computed(() => {
  return groupBy(parts.value, "part_name");
});

export function useIK(sceneContainerSelector) {
  let scene = ref();
  let sceneCreating = ref(false);

  const interval = 1000 / 5;
  let timer = -1;

  const rotationMap = ref({});
  const watchers = new Set();

  onMounted(async () => {
    await initScene();
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
    } finally {
      sceneCreating.value = false;
    }
  }

  function getRotationMap() {
    Object.assign(rotationMap.value, scene.value.getRotationMap());
  }

  // todo: wip
  function mapToServo(bone, coefficient) {
    if (bone.match(/_r/)) {
      return;
    }

    function mapLinear(x, a1, a2, b1, b2) {
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    let [part_name] = bone.split("_");
    let part = partsByName.value[part_name]?.[0];
    if (!part) return;

    let { pin, min, max } = part;
    let angle = Math.round(
      mapLinear(coefficient, 0, 1, Number(min), Number(max))
    );

    setAngle("lt_port", pin, angle, servo_params.value.speed);
  }

  function startLoop() {
    getRotationMap();

    Object.keys(rotationMap.value).forEach((bone) => {
      const stop = watch(
        () => rotationMap.value[bone],
        (coefficient) => mapToServo(bone, coefficient)
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
