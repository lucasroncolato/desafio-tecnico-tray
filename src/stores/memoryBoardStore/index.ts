import { defineStore } from "pinia";

export const useMemoryBoardStore = defineStore("memoryBoard", {
  state: () => ({
    shuffledCards: [] as any[], // Armazena as cartas embaralhadas
    flippedCards: [] as number[], // Armazena as cartas viradas
    matchedCards: [] as number[], // Armazena as cartas combinadas
    attempts: 0, // Número de tentativas
    timeElapsed: 0, // Tempo do jogo
    gameStarted: false, // Estado do jogo
  }),
  actions: {
    startGame() {
      this.gameStarted = true;
      this.timeElapsed = 0;
      this.attempts = 0;
      this.flippedCards = [];
      this.matchedCards = [];
    },
    finishGame(time: number, attempts: number) {
      this.timeElapsed = time;
      this.attempts = attempts;
    },
    flipCard(index: number) {
      if (
        this.flippedCards.length < 2 &&
        !this.flippedCards.includes(index) &&
        !this.matchedCards.includes(index)
      ) {
        this.flippedCards.push(index);
      }
    },
    resetGame() {
      this.flippedCards = [];
      this.matchedCards = [];
      this.attempts = 0;
      this.timeElapsed = 0;
      this.gameStarted = false;
    },
    addMatchedCards(indices: number[]) {
      this.matchedCards.push(...indices);
    },
    incrementAttempts() {
      this.attempts++;
    },
  },
});
