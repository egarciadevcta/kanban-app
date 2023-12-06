<script setup>
  import { useBoardsStore } from '@/stores/board.js';
  import { useControllerStore } from '@/stores/controller.js';
  import SelectStatus from '@/components/Select.vue';
  import DropDown from '@/components/DropDown.vue';
  import{ bulletColors } from "../utils/helpers";

  const boardsStore = useBoardsStore();
  const controllerStore = useControllerStore();
  
  const changeColumn = ({ index }) => {
    boardsStore.changeTaskColumn(index);
  }
  const editTask = () => {
    controllerStore.cardTaskForm = { edit: true, visible: true };
    controllerStore.cardTaskView = false;
  }
  const deleteTask = () => {
    controllerStore.delete = { board: false, visible: true };
    controllerStore.cardTaskView = false;
  };
</script>
<template>
    <div class="bg-white dark:bg-dark-grey rounded-lg p-1">
      <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-auto ">
        <div class="flex justify-between items-center gap-4">
          <h4 class="text-black dark:text-white font-bold text-lg">{{ boardsStore.getCardTask?.title }}</h4>
          <DropDown @onClickEdit="editTask" @onClickDelete="deleteTask" target="Task" />
        </div>
        <p v-if="boardsStore.getCardTask?.description" class="text-medium-grey text-sm">{{ boardsStore.getCardTask.description }}
        </p>
        <span class="text-xs text-red-light font-sans block mt-2">Expiration: {{ boardsStore.getCardTask?.expiration ? ` ${boardsStore.getCardTask.expiration}`: 'No data' }}</span>
        <div class="flex space-x-4">
          <p 
            v-for="(tag, index) in boardsStore?.getCardTask?.tags" 
            :key="index" 
            :tag="tag" 
            class="rounded-md px-3 py-0 text-xs items-center text-center font-semibold"
            :style="{ backgroundColor: bulletColors()}">
              {{ tag.title }}
          </p>
        </div>
        <span></span>
        <div>
          <p class="text-medium-grey dark:text-white text-xs font-bold pb-4">Current Status</p>
          <SelectStatus @onClickOption="changeColumn" :value="boardsStore.getCurrentColumn.name" />
        </div>
      </div>
    </div>
</template>