<script setup>
import { ref, reactive, onBeforeUpdate } from 'vue'
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import Input from '@/components/InputElement.vue';
import BtnSubmit from '@/components/BtnPrimary.vue';
import BtnNewColumn from '@/components/BtnSecundaryLarge.vue';

const boardsStore = useBoardsStore();
const controllerStore = useControllerStore();

const inputTitle = ref('');
const inputs = ref([]);

const board = reactive({
  name: '',
  columns: []
});
const columnsPlaceholders = {
  0: 'Todo...',
  1: 'In Progress...',
  2: 'Done...'
}

const addColumn = () => {
  board.columns.push({ name: '', tasks: [] });
}
const onSubmit = () => {
  if (validate()) {
    if (controllerStore.boardForm.edit) {
      boardsStore.boards[boardsStore.selectedBoard] = board;
    } else {
      boardsStore.boards.push(board);
      boardsStore.selectedBoard = boardsStore.boards.length - 1;
    }
    controllerStore.hideOverlay();
  }
}
const validate = () => {
  let valid = true;
  if (board.name.trim().length === 0) {
    valid = false;
    inputTitle.value.error = true;
  }
  inputs.value.forEach((e, index) => {
    if (board?.columns[index]?.name.trim().length === 0) {
      valid = false;
      e.error = true;
    }
  });
  return valid;
}
//EDIT MODE
if (controllerStore.boardForm.edit) {
  board.name = JSON.parse(JSON.stringify(boardsStore.boards[boardsStore.selectedBoard].name));
  board.columns = JSON.parse(JSON.stringify(boardsStore.getCurrentBoard.columns));
} else {
  board.columns = [{ name: '', tasks: [] }, { name: '', tasks: [] }];
}
onBeforeUpdate(() => {
  inputs.value = []
});
</script>
<template>
    <form @submit.prevent="onSubmit" class="bg-white dark:bg-dark-grey rounded-lg p-1">
      <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
        <div class="flex justify-between items-center">
          <h4 class="text-black dark:text-white font-bold text-lg">
            {{ controllerStore.boardForm.edit ? 'Edit Board' : 'Add New Board' }}
          </h4>
        </div>
        <Input ref="inputTitle" v-model="board.name" inputName="Board Name" placeholder="e.g. Web Design" />
        <div class="flex flex-col gap-3">
          <p class="text-medium-grey dark:text-white text-xs font-bold">Board Columns</p>
          <div class="flex items-center justify-between gap-4" v-for="(column, index) in board.columns" :key="index">
            <Input :ref="el => { inputs[index] = el }" v-model="column.name"
              :placeholder="columnsPlaceholders[index] ? columnsPlaceholders[index] : 'Your Column title...'" />
          </div>
          <BtnNewColumn @click.stop="addColumn">+ Add New Column</BtnNewColumn>
        </div>
        <BtnSubmit type="submit">
          {{ controllerStore.boardForm.edit ? 'Save Changes' : 'Create New Board' }}
        </BtnSubmit>
      </div>
    </form>
</template>
