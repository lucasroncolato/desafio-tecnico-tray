<template>
  <button :class="[
    'font-bold rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center',
    colorClass,
    sizeClass,
    customClass
  ]" :type="type" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  color: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  customClass: { type: String, default: '' },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  }
});
const colorClass = {
  primary: 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:scale-105 hover:shadow-xl',
  secondary: 'bg-white text-gray-800 shadow-md border border-gray-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg',
  success: 'bg-blue-600 text-white hover:bg-blue-700',
}[props.color] || '';
const sizeClass = {
  md: 'py-4 px-8 text-base',
  sm: 'py-2 px-4 text-sm',
  lg: 'py-6 px-12 text-lg',
}[props.size] || '';
</script>
