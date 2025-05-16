<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="onClose">
    <div class="bg-white pt-14 pb-6 px-6 rounded-xl shadow-xl max-w-full w-auto text-center relative"
      :class="containerClass" @keydown.esc="onClose" tabindex="0">
      <slot />
      <button v-if="showClose" @click="onClose" class="absolute top-4 right-4">
        <slot name="close">
          <CloseIcon class="w-6 h-6 text-gray-700 cursor-pointer" />
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import CloseIcon from '@/components/elements/Icons/CloseIcon.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  showClose: { type: Boolean, default: true },
  containerClass: { type: String, default: '' }
});
const emit = defineEmits(['close']);
function onClose() {
  emit('close');
}
</script>

<style scoped>
:focus {
  outline: none;
}
</style>
