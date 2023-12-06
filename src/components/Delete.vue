<script setup>
import { computed } from 'vue';
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import BtnDelete from '@/components/BtnDelete.vue';
import BtnCancel from '@/components/BtnSecundaryLarge.vue';

const boardsStore = useBoardsStore();
const controllerStore = useControllerStore();

const warning = computed(() => {
  if (controllerStore.delete.board) {
    return `Are you sure you want to delete the ‘${boardsStore.getCurrentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
  } else {
    return `Are you sure you want to delete the ‘${boardsStore.getCardTask.title}’ task? This action cannot be reversed.`
  }
});

const onDelete = () => {
  if (controllerStore.delete.board) {
    boardsStore.boards.splice(boardsStore.selectedBoard, 1)
    controllerStore.hideOverlay()
  } else {
    boardsStore.getCurrentColumn.tasks.splice(boardsStore.selectedTask, 1)
    controllerStore.hideOverlay()
  }
}
const onCancel = () => {
  controllerStore.hideOverlay();
};
</script>
<template>
    <div class="bg-white dark:bg-dark-grey rounded-lg">
      <div class="p-6 flex flex-col gap-6">
        <div class="flex justify-between items-center">
          <h4 class="text-red font-bold text-lg">Delete this {{ controllerStore.delete.board ? 'board' : 'task' }}</h4>
        </div>
        <p class="text-medium-grey text-sm">{{ warning }}</p>
        <div class="flex flex-col gap-4">
          <BtnDelete @click.stop="onDelete">Delete</BtnDelete>
          <BtnCancel @click.stop="onCancel">Cancel</BtnCancel>
        </div>
      </div>
    </div>
</template>