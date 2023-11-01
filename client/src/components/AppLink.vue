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
    <a :href="href" @click="navigate">
      <slot>
        <button
          v-bind="$attrs"
          :class="
            isActive ? activeClass || 'active' : inactiveClass || 'inactive'
          "
        >
          {{ name }}
        </button>
      </slot>
    </a>
  </router-link>
</template>

<style scoped>
nav button {
  text-align: left;
  height: 3rem;
  width: 100%;

  border: 1px solid lightgray;
  border-left: 5px solid lightgray;
  border-radius: 0.25rem;

  cursor: pointer;
}

nav button.active {
  border: 1px solid blue;
  border-left: 5px solid blue;
  color: blue;
}
</style>
