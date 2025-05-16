// src/stores/gameStore.ts
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    level: 1,
    maxLevel: 3,
    isGameStarted: false,
    gameFinished: false,
    timeElapsed: 0,
    attempts: 0,
  }),
  actions: {
    startGame() {
      this.isGameStarted = true;
    },
    finishGame(time: number, attempts: number) {
      this.timeElapsed = time;
      this.attempts = attempts;
      this.gameFinished = true;
    },
    restartGame() {
      this.isGameStarted = false;
      this.gameFinished = false;
      this.timeElapsed = 0;
      this.attempts = 0;
    },
  },
});
