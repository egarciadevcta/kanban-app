<script setup>
import { useControllerStore } from '@/stores/controller.js';
import BtnNewBoard from '@/components/BtnPrimarySmall.vue';

const controllerStore = useControllerStore();
const createNewBoard = () => {
  controllerStore.overlay = true;
  controllerStore.boardForm = { visible: true, edit: false };
};
</script>
<template>
  <div
    class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-11/12 max-w-sm transition-all"
    :class="controllerStore.sidebar ? 'sm:translate-x-[-85%] sm:w-6/12 md:translate-x-[-80%] lg:translate-x-[-75%]' : ''">
    <p class="text-center text-lg font-bold text-medium-grey">There is no boards Create a new board to get started.
    </p>
    <BtnNewBoard @click.stop="createNewBoard">+ Add New Board</BtnNewBoard>
  </div>
</template>