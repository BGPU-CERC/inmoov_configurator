import { throttle } from "lodash";
import { ref } from "vue";

let breakpoints = ref();

window.addEventListener(
  "resize",
  throttle(() => {
    breakpoints.value = calcBreakpoints();
  }, 0.1 * 1000)
);

function calcBreakpoints() {
  return {
    md: window.matchMedia("(max-width: 1439.99px)").matches,
  };
}

export function useBreakpoints() {
  return {
    breakpoints,
  };
}
