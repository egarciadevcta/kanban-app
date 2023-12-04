<script setup>
import { useControllerStore } from '@/stores/controller.js';
import { useBoardsStore } from '@/stores/board.js';

const controllerStore = useControllerStore();
const boardsStore = useBoardsStore();

const onClickBoard = (index) => {
  boardsStore.selectedBoard = index;
}
const createNewBoard = () => {
  controllerStore.overlay = true;
  controllerStore.boardForm = { visible: true, edit: false };
};
</script>
<template>
    <div class="z-10 transition-all fixed"
    :class=" ['translate-x-[0]']">
      <div
        class="bg-white dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[300px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark">
        <p class="text-medium-grey text-xs font-bold py-4 px-6">BOARDS ({{ boardsStore.boards.length }})</p>
        <div @click="onClickBoard(index)" v-for="(board, index) in boardsStore.boards" :key="index"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold   "
          :class="board?.name === boardsStore?.getCurrentBoard?.name ?
          ['bg-main-blue', 'text-white', 'fill-white', 'hover:bg-main-blue-light']
          :
          ['fill-medium-grey', 'hover:text-main-blue', 'hover:fill-main-blue', 'hover:bg-main-blue/10']">
          <span>||||</span>
          <span>{{ board.name }}</span>
        </div>
        <div @click="createNewBoard()"
          class=" flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-blue text-main-blue hover:bg-medium-grey/10">
          <span>||||</span>
          <span>+ Create New Board</span>
        </div>
      </div>
    </div>
</template>
