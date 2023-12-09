<script setup>
//import AddButtonMobile from '@/components/buttons/AddTaskMobile.vue'
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import DropDown from '@/components/DropDown.vue';
import BtnNewTask from '@/components/BtnPrimarySmall.vue';
import SearchForm from "@/components/SearchForm.vue";

const boardsStore = useBoardsStore();
const controllerStore = useControllerStore();

const editTask = () => {
  controllerStore.overlay = true;
  controllerStore.boardForm = { edit: true, visible: true };
};
const deleteTask = () => {
  controllerStore.overlay = true;
  controllerStore.delete = { board: true, visible: true };
};
const addTask = () => {
  controllerStore.overlay = true;
  controllerStore.cardTaskForm = { visible: true, edit: false };
};

</script>
<template>
  <header class="bg-white top-0 left-0 w-full flex items-center sm:pr-4">
    <div class="hidden items-center sm:flex pl-6 h-20 border-r border-r-lines-light md:h-24"
      :class="['min-w-[256px]', 'lg:min-w-[300px]']">
      <img src="@/assets/vue.svg" alt="logo" />
    </div>
    <div class="mx-auto max-w-sm w-11/12 flex items-center h-16 gap-4
    sm:h-20">
      <div>
        <img class="sm:hidden" src="@/assets/logo-mobile.svg" height="25" width="24" alt="logo" />
      </div>
      <div @click="showMobileBar" class="flex items-center gap-2 group cursor-pointer sm:hidden">
        <h1 class="text-black font-bold text-lg cursor-pointer">{{ boardsStore.getCurrentBoard?.name }}
        </h1>
      </div>
      <h1 class="text-black dark:text-white font-bold hidden text-xl sm:block">
        {{ boardsStore.getCurrentBoard?.name }}
      </h1>
      <SearchForm />
      <div v-if="boardsStore.boards.length" class="flex items-center gap-4 ml-auto">
        <BtnNewTask @click="addTask" class="hidden sm:block">+ Add New Task</BtnNewTask>
        <DropDown target="Board" @onClickEdit="editTask" @onClickDelete="deleteTask" />
      </div>
    </div>
  </header>
</template>