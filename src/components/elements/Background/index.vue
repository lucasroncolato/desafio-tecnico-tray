<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black flex flex-col p-4 overflow-hidden relative">
    <Header />

    <div class="flex-grow flex flex-col items-center justify-center relative">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/elements/Header/index.vue'
</script>
