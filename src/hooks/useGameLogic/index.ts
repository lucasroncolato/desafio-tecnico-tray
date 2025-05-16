import { nextTick, ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export function useGameLogic() {
  const gameStore = useGameStore();
  const showModal = ref(false);
  const boardRef = ref(null);
  
  async function restartGame() {
    gameStore.restartGame();
  
    if (boardRef.value) {
      await boardRef.value.resetGame();
    }
  
    nextTick(() => {
      startGame();
    });
  }  
  
  function handleGameFinished(data: { time: number; attempts: number }) {
    gameStore.finishGame(data.time, data.attempts);
  }

  function startGame() {
    gameStore.startGame();
  }

  function openAboutModal() {
    showModal.value = true;
  }

  return {
    gameStore,
    showModal,
    boardRef,
    restartGame,
    handleGameFinished,
    startGame,
    openAboutModal
  };
}
