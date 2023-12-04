<script setup>
  import { ref } from 'vue';
  import { useBoardsStore } from '@/stores/board.js';
  
  const emit = defineEmits(['onClickOption']);
  const props = defineProps({
    editColumn: {
      type: String
    }
  })
  const select = ref(null);
  const options = ref(null);
  const inputSelect = ref(null);
  const store = useBoardsStore();
  
  const onFocusSelect = () => {
    options.value.scrollIntoView({ behavior: "smooth", block: "end" });
  }
  const onClickOption = (index, name) => {
    select.value.blur();
    emit('onClickOption', { index, name });
  
  };
</script>
<template>
    <div ref="select" @focusin="onFocusSelect" tabindex="1" class="text-sm text-black dark:text-white font-bold rounded px-4 py-3
    relative w-full flex items-center border border-medium-grey border-opacity-25 cursor-pointer
    hover:border-main-blue focus:border-main-blue group">
      <input ref="inputSelect" disabled v-bind="$attrs" class="w-full bg-white dark:bg-dark-grey cursor-pointer" />
      <img class="group-focus:hidden" src="../assets/icon-arrow-down.svg"/>
      <img class="hidden group-focus:block" src="../assets/icon-arrow-up.svg"/>
      <div ref="options"
        class="hidden absolute rounded left-0 top-full mt-4 w-full bg-white dark:bg-dark-grey group-focus:block">
        <div @click="onClickOption(index, column.name)"
          class="p-4 text-medium-grey hover:text-black dark:hover:text-white" v-for="(column, index) in store.getColumns">
          {{ column.name }}
        </div>
      </div>
    </div>
</template>
  