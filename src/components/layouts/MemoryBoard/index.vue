<template>
  <div class="flex flex-col items-center gap-6 mt-6 px-2 sm:px-4 w-full max-w-5xl mx-auto">
    <div
      class="grid grid-cols-4 gap-2 sm:gap-4 mx-auto"
    >
      <MemoryCard
        v-for="(card, index) in memoryBoardStore.shuffledCards"
        :key="card.uniqueKey"
        :card="card"
        @flip="flipCard(index)"
        :isFlipped="
          memoryBoardStore.flippedCards.includes(index) ||
          memoryBoardStore.matchedCards.includes(index)
        "
        :isMatched="memoryBoardStore.matchedCards.includes(index)"
      />
    </div>

    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-white bg-opacity-80 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md mt-4 sm:mt-8 w-full max-w-2xl"
    >
      <div class="flex items-center gap-2">
        <BoltIcon class="w-6 h-6 text-purple-500" />
        <span class="text-gray-700 font-bold text-base"
          >Tentativas: {{ memoryBoardStore.attempts }}</span
        >
      </div>

      <div class="flex items-center gap-2">
        <ClockIcon class="w-6 h-6 text-purple-500" />
        <span class="text-gray-700 font-bold text-base"
          >Tempo: {{ formattedTime }}</span
        >
      </div>

      <BaseButton color="primary" size="sm" class="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-4" @click="resetGame">
        <ArrowPathIcon class="w-6 h-6 text-purple-200" /> Reiniciar
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemoryCard from '@/components/widgets/MemoryCard/index.vue';
import BaseButton from '@/components/elements/Button/index.vue';
import { useMemoryBoard } from '@/hooks/useMemoryBoard';
import BoltIcon from '@/components/elements/Icons/BoltIcon/index.vue';
import ClockIcon from '@/components/elements/Icons/ClockIcon/index.vue';
import ArrowPathIcon from '@/components/elements/Icons/ArrowPathIcon/index.vue';

const emit = defineEmits<{
  (e: 'game-finished', data: { time: number; attempts: number }): void;
}>();

const {
  memoryBoardStore,
  resetGame,
  flipCard
} = useMemoryBoard(emit);

import { computed } from 'vue';

const formattedTime = computed(() => {
  const totalSeconds = memoryBoardStore.timeElapsed;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
});

defineExpose({ resetGame });
</script>
