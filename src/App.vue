<script setup>
import Board from '@/components/Board.vue';
import HeaderP from '@/components/Header.vue';
import bgOverlay from '@/components/BgOverlay.vue';
import CardTaskView from '@/components/CardTaskModal.vue';

import { onMounted } from 'vue';
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import NoBoards from '@/components/NoBoards.vue';
import CardTaskForm from '@/components/CardTaskForm.vue';
import BoardForm from '@/components/BoardForm.vue';
import DeleteAction from '@/components/DeleteActionView.vue';
import Sidebar from '@/components/Sidebar.vue';
import { saveInLocalStorage, getDataFromLocalStorage } from './utils/helpers';

const boardsStore = useBoardsStore();
const controllerStore = useControllerStore();

const getColumns = () => {
  return boardsStore.getColumns();
}
onMounted(async () => {
  boardsStore.$subscribe((_mutations, state) => {
    saveInLocalStorage(state);
  });
  const storageData = getDataFromLocalStorage();
  if (storageData === null) {
    const jsonData = await import('@/persistence/app-data.json');
    boardsStore.boards = jsonData.boards;
  } else {
      boardsStore.$state = JSON.parse(storageData);
  }
}); 
</script>
<template>
  <HeaderP />
  <main>
    <div class="flex w-full">
      <Sidebar />
      <div v-dragscroll:nochilddrag
        class="relative h-full w-screen min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey dark:bg-very-dark-grey transition-all "
        :class="['sm:translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw+256px']">
        <div data-dragscroll class="mx-auto w-11/12 pt-6 pb-24 ">
          <div data-dragscroll v-if="getColumns" class="flex">
            <Board data-dragscroll />
          </div>
          <NoBoards v-else />
        </div>
      </div>
    </div>
  </main>
  <bgOverlay data-no-dragscroll/>
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 max-w-xs w-11/12 sm:max-w-md">
    <CardTaskView v-if="controllerStore.cardTaskView" />
    <CardTaskForm v-if="controllerStore.cardTaskForm.visible" />
    <DeleteAction v-if="controllerStore.delete.visible" />
    <BoardForm v-if="controllerStore.boardForm.visible" />
  </div>
</template >
