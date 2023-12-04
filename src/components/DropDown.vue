<script setup>

const props = defineProps({
  target: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['onClickEdit', 'onClickDelete']);
</script>
<template>
    <div tabindex="1" class="group cursor-pointer relative">
      <img src="../assets/icon-vertical-ellipsis.svg" />
      <div class="absolute right-28 top-8 hidden group-focus:block">
        <div class="bg-white dark:bg-very-dark-grey rounded-lg text-sm w-36 flex flex-col fixed z-10">
          <p @click="emit('onClickEdit', target)" class="text-medium-grey text-xs font-bold w-full p-4 ">Edit {{ target }}</p>
          <p @click="emit('onClickDelete', target)" class="text-red text-xs font-bold w-full p-4 ">Delete {{ target }}</p>
        </div>
      </div>
    </div>
</template>
