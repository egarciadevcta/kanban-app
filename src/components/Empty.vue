<script setup>
  import { useControllerStore } from '@/stores/controller.js';
  import BtnPrimarySmall from '@/components/PrimarySmall.vue'
  const controllerStore = useControllerStore();
  
  const addTask = () => {
    controllerStore.overlay = true;
    controllerStore.taskForm = { visible: true, edit: false };
  };
</script>
<template>
    <div
      class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-11/12 max-w-sm transition-all "
      :class="controllerStore.sidebar ? 'sm:translate-x-[-85%] sm:w-6/12 md:translate-x-[-80%] lg:translate-x-[-75%]' : ''">
      <p class="text-center text-lg font-bold text-medium-grey">
        This board is empty. Create a new column to get started.
      </p>
      <BtnPrimarySmall @click.stop="addTask">+ Add New Column</BtnPrimarySmall>
    </div>
</template>