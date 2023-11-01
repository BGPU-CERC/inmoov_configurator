import { onMounted, ref } from "vue";
import { init as initInmoovScene } from "inmoov_ik";
import inmoovScene from "inmoov_ik/inmoov.glb";

export function useIK(sceneContainerSelector) {
  let scene = ref();
  let sceneCreating = ref(false);

  onMounted(async () => {
    if (scene.value) return;
    if (sceneCreating.value) return;

    try {
      sceneCreating.value = true;
      scene.value = await initInmoovScene(sceneContainerSelector, inmoovScene);
    } finally {
      sceneCreating.value = false;
    }
  });

  return {
    scene,
    sceneCreating,
  };
}
