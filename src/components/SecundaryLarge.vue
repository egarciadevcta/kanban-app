<template>
    <div>
      <button
        type="button" v-bind="$attrs" class="w-full text-sm font-bold py-2.5 px-4 rounded-3xl text-main-blue bg-main-blue/10 dark:bg-white hover:bg-main-blue-light hover:text-white dark:text-main-blue ">
        <slot></slot>
      </button>
    </div>
</template>