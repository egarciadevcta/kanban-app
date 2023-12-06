<script setup>
import CardTask from "@/components/CardTask.vue";
import { useBoardsStore } from '@/stores/board.js';
import { useControllerStore } from '@/stores/controller.js';
import { computed } from "vue";
import { bulletColors } from "../utils/helpers";

const controllerStore = useControllerStore();
const boardsStore = useBoardsStore();
const searchTerm = computed(() => boardsStore.getSearchTerm);
const columns = computed(() => boardsStore.getColumns);
const droppedTaskCard = computed(()=> boardsStore.getDroppedTaskCard);

const onClickTask = (column, task) => {
  boardsStore.selectedColumn = column;
  boardsStore.selectedCardTask = task;
  controllerStore.cardTaskView = true;
  controllerStore.overlay = true;
}
const handleDragStart = (task, columnIndex, taskIndex) => {
  const taskData = { task, columnIndex, taskIndex }
  boardsStore.setDraggedCardTask(taskData);
  console.log('Task Card data:', droppedTaskCard.value.task);
}
const handleOndrop = (columnIndex) => {
  boardsStore.drop(columnIndex);
}
const handleDragOver = (event) => {
  event.preventDefault();
}
</script>

<template>
  <div class="flex gap-6 items-start">
    <section  
      data-dragscroll 
      v-if="searchTerm" 
      v-for="(columnS, columnIndexS) in columns" :key="columnIndexS" 
      class="min-w-[280px] box-content"
      @drop="handleOndrop(columnIndexS)"
      @dragover="handleDragOver"
    >
      <div class="flex items-center gap-3 pb-6 ">
        <div class="rounded-full h-4 w-4" :style="{ backgroundColor: bulletColors(columnIndexS) }"></div>
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ columnS.name }} ( {{ columnS.tasks.length }} )
        </h2>
      </div>
      <div
        v-for="(taskF, taskIndexF) in boardsStore.filteredTasks(columnS?.tasks)" 
        :key="taskIndexF"
        class="list-none cursor-grab active:cursor-grabbing active:animate-pulse"
        draggable="true"
        @dragstart="handleDragStart(taskF, columnIndexS, taskIndexF)"
      >
        <CardTask 
          @click="onClickTask(columnIndexS, taskIndexF)" 
          :task="taskF" 
          />
      </div>
    </section>
    <section 
      data-dragscroll 
      v-else 
      v-for="(column, columnIndex) in boardsStore.getColumns" 
      :key="columnIndex" 
      class="bg-lines-dark rounded-lg min-w-[280px] justify-start"
      @drop="handleOndrop(columnIndex)"
      @dragover="handleDragOver"
    >        
      <div class="flex gap-3 p-6">
        <div class="rounded-full h-4 w-4" :style="{ backgroundColor: bulletColors(columnIndex) }"></div>
        <h2 class="text-lines-light font-bold text-xs uppercase">
          {{ column.name }} ( {{ column.tasks.length }} )
        </h2>
      </div>
        <div
          v-for="(task, taskIndex) in column?.tasks" 
          :key="taskIndex"
          class="list-none transition-transform ease-in-out active:opacity-10 border-none active:rotate-3" 
          draggable="true"
          @dragstart="handleDragStart(task, columnIndex, taskIndex)"
        >
          <CardTask v-model="column.tasks" @click="onClickTask(columnIndex, taskIndex)" :task="task" :columnIndex="columnIndex"/>
    </div>
    </section>
  </div>
</template>



