<script setup>
import { useBoardsStore } from "../stores/board";
import { bulletColors } from "../utils/helpers";

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  columnIndex: Number,
});
</script>
<template>
  <li>
    <article class="group shadow-task relative active:drop-shadow-md bg-white p-4 m-2 rounded-lg cursor-pointer max-w-[280px]">
      <h3 class="text-black font-bold group-hover:text-main-blue leading-4 mb-2 select-none">{{ task.title }}</h3>
      <p class="text-xs text-medium-grey font-bold select-none text-justify overflow-ellipsis overflow-hidden">{{ task.description }} </p>
      <span class="text-xs text-red-light font-sans block mt-2">{{ task.expiration? `Expiration: ${task.expiration}`: '' }}</span>
      <span 
        class="rounded-md border border-medium-grey px-1 py-0 text-xs " 
        :style="{ backgroundColor: bulletColors(props.columnIndex) }">
        {{ useBoardsStore().getColumns[columnIndex].name }}
      </span>

    </article>
  </li>
</template>

  
 