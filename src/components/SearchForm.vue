<script setup>
	import { useBoardsStore } from '@/stores/board.js'
	import { ref } from 'vue';

	const boardStore = useBoardsStore();
	const searchTerm = ref(boardStore.searchTerm);

	const updateSearchTerm = () => {
  		boardStore.setSearchTerm(searchTerm.value);
	};
</script>

<template>
  <form class="py-3 px-4 flex items-center">
    <div class="relative w-full">
      <input v-model="searchTerm" @input="updateSearchTerm" placeholder="Buscar task" class="bg-light-grey border-solid:1px border-medium-grey text-dark-grey"/>
  	</div>
  </form>
</template>