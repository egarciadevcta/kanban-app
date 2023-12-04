<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});
</script>
<template #item="{element, index}">
  <li>
    <article class="group relative active:drop-shadow-md bg-white p-4 m-2 rounded-lg cursor-pointer shadow-task max-w-[280px]">
      <h3 class="text-black font-bold group-hover:text-main-blue leading-4 mb-2 select-none">{{ task.title }}</h3>
      <p class="text-xs text-medium-grey font-bold select-none text-justify overflow-ellipsis overflow-hidden">{{ task.description }} </p>
    </article>
  </li>
</template>
<style scoped>
.drag > article {
  transform: rotate(5deg);
}
.ghost {
  background: rgb(194, 64, 64);
  border-radius: 6px;
}
.ghost > article {
  visibility: hidden;
}
</style>
  
 