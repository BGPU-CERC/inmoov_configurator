<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
  name: String,
});

const isExternalLink = computed(() => {
  return typeof props.to === "string" && props.to.startsWith("http");
});
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot>
        <button>{{ name }}</button>
      </slot>
    </a>
  </router-link>
</template>

<style scoped>
nav button {
  height: 3rem;
  width: 100%;
}
</style>
