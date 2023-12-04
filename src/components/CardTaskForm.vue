<script setup>
import { ref, reactive, onBeforeUpdate } from 'vue';
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import SelectState from '@/components/Select.vue';
import InputText from '@/components/InputText.vue';
import Textarea from  '@/components/Textarea.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';

const boardsStore = useBoardsStore();
const controllerStore = useControllerStore();
const columnName = ref('');

const inputTitle = ref(null);
const inputs = ref([]);

const form = reactive({
  task: {
    title: '',
    description: '',
  },
  column: 0
});

const onSubmit = () => {
  if (validate()) {
    if (controllerStore.cardTaskForm.edit) {
      boardsStore.getCurrentColumn.tasks[boardsStore.selectedCardTask] = form.task;
      //boardsStore.saveTaskChanges(form.task, form.column);
    } else {
      boardsStore.getColumns[form.column].tasks.push(form.task);
    }
    controllerStore.hideOverlay();
  }
}
const validate = () => {
  let valid = true;
  if (form.task.title.trim().length === 0) {
    valid = false;
    inputTitle.value.error = true;
  }
  return valid;
}
const updateColumn = ({ index, name }) => {
  form.column = index;
  columnName.value = name;
}

//EDIT MODE
if (controllerStore.cardTaskForm.edit) {
  form.task = JSON.parse(JSON.stringify(boardsStore.getCardTask));
  form.column = JSON.parse(JSON.stringify(boardsStore.getCurrentColumn));
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[boardsStore.selectedColumn]));
} else {
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[0]));
}

onBeforeUpdate(() => {
  inputs.value = [];
});
</script>
<template>
    <form @submit.prevent="onSubmit" class="bg-white dark:bg-dark-grey rounded-lg p-1">
      <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
        <div class="flex justify-between items-center">
          <h4 class="text-black dark:text-white font-bold text-lg">
            {{ controllerStore.cardTaskForm.edit ? 'Edit Task' : 'Add New Task' }}
          </h4>
        </div>
        <InputText ref="inputTitle" v-model="form.task.title" inputName="Title" placeholder="e.g. Take coffee break" />
        <Textarea v-model="form.task.description" inputName="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." />
        <div class="flex flex-col gap-2">
          <p class="text-medium-grey text-xs font-bold">Status</p>
          <SelectState @onClickOption="updateColumn" :value="columnName" />
        </div>
        <ButtonPrimary type="submit">
          {{ controllerStore.cardTaskForm.edit ? 'Save Changes' : 'Create Task' }}
        </ButtonPrimary>
      </div>
    </form>
</template>
