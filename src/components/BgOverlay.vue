<script setup>
  import { useControllerStore } from '@/stores/controller.js';
  const controllerStore = useControllerStore();
</script>
<template>
    <div @click="controllerStore.hideOverlay" v-if="controllerStore.overlay"
      class="fixed min-h-screen min-w-full bg-black bg-opacity-50 top-0 left-0 z-10">
      <slot></slot>
    </div>
</template>
