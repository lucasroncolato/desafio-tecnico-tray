<template>
  <Background>
    <div
      class="flex flex-col items-center justify-center z-10 relative gap-3 sm:gap-5 w-full max-w-2xl mx-auto px-2 sm:px-0 py-4 sm:py-8">
      <QuestionMarkCircleIcon class="w-6 h-6 text-gray-500" @click="openAboutModal" />

      <Button v-if="!gameStore.isGameStarted" color="secondary" ghost size="md" @click="startGame">
        Começar Jogo
      </Button>

      <Button v-if="!gameStore.isGameStarted" color="secondary" size="md" @click="historyRouter">
        Histórico de Jogos
      </Button>

      <MemoryBoard v-if="gameStore.isGameStarted" @game-finished="handleGameFinished" ref="boardRef" />

      <GameSummaryModal v-if="gameStore.gameFinished" :time="gameStore.timeElapsed" :attempts="gameStore.attempts"
        @restart="restartGame" />

      <AboutModal v-if="showModal" @close="showModal = false" @start="startGame" />
    </div>
  </Background>
</template>

<script setup lang="ts">
import { useGameLogic } from "@/hooks/useGameLogic";
import MemoryBoard from "@/components/layouts/MemoryBoard/index.vue";
import GameSummaryModal from "@/components/widgets/GameSummaryModal/index.vue";
import AboutModal from "@/components/widgets/AboutModal/index.vue";
import Button from "@/components/elements/Button/index.vue";
import QuestionMarkCircleIcon from "@/components/elements/Icons/QuestionMarkCircleIcon/index.vue";
import router from "@/router";

function historyRouter() {
  router.push('/history')
}

const {
  gameStore,
  showModal,
  boardRef,
  restartGame,
  handleGameFinished,
  startGame,
  openAboutModal
} = useGameLogic();
</script>
