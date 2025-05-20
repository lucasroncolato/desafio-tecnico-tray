import { useGameStore } from "@/stores/gameStore";
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useMemoryBoardStore } from "@/stores/memoryBoardStore";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export function useMemoryBoard(emit?: (e: string, data: any) => void) {
  const game = useGameStore();
  const memoryBoardStore = useMemoryBoardStore();
  const timerRef = ref<number | null>(null);

  async function fetchImages() {
    try {
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const response = await axios.get(
        `https://api.pexels.com/v1/curated?per_page=8&page=${randomPage}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );

      const cards = response.data.photos.map((photo: any) => ({
        id: uuidv4(),
        imageUrl: photo.src.medium,
      }));

      shuffleCards(cards);
    } catch (error) {
      console.error("Erro ao buscar imagens da API Pexels:", error);
    }
  }

  function shuffleCards(cards: any[]) {
    const shuffled = [...cards, ...cards];
    shuffled.sort(() => Math.random() - 0.5);
    memoryBoardStore.shuffledCards = shuffled.map((card, index) => ({
      ...card,
      uniqueKey: `${card.id}-${index}`,
    }));
  }

  function startTimer() {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
    timerRef.value = setInterval(() => {
      memoryBoardStore.timeElapsed++;
    }, 1000) as unknown as number;
  }

  function stopTimer() {
    if (timerRef.value) {
      clearInterval(timerRef.value);
      timerRef.value = null;
    }
  }

  function resetGame() {
    stopTimer();
    memoryBoardStore.timeElapsed = 0;
    memoryBoardStore.attempts = 0;
    memoryBoardStore.flippedCards = [];
    memoryBoardStore.matchedCards = [];
    memoryBoardStore.gameStarted = false;
    fetchImages();
  }

  function flipCard(index: number) {
    memoryBoardStore.flipCard(index);
    if (!memoryBoardStore.gameStarted) {
      memoryBoardStore.startGame();
      startTimer();
    }

    if (memoryBoardStore.flippedCards.length === 2) {
      memoryBoardStore.incrementAttempts();
      const [firstIndex, secondIndex] = memoryBoardStore.flippedCards;
      if (
        memoryBoardStore.shuffledCards[firstIndex].imageUrl ===
        memoryBoardStore.shuffledCards[secondIndex].imageUrl
      ) {
        memoryBoardStore.addMatchedCards([firstIndex, secondIndex]);
        memoryBoardStore.flippedCards = [];
        if (
          memoryBoardStore.matchedCards.length ===
          memoryBoardStore.shuffledCards.length
        ) {
          stopTimer();
          if (emit) {
            emit("game-finished", {
              time: memoryBoardStore.timeElapsed,
              attempts: memoryBoardStore.attempts,
            });
          }
        }
      } else {
        setTimeout(() => {
          memoryBoardStore.flippedCards = [];
        }, 1000);
      }
    }
  }

  onMounted(() => {
    fetchImages();
  });

  return {
    memoryBoardStore,
    fetchImages,
    shuffleCards,
    startTimer,
    stopTimer,
    resetGame,
    flipCard,
  };
}
