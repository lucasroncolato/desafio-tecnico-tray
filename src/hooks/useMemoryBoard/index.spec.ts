import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMemoryBoard } from './index';
import { useMemoryBoardStore } from '@/stores/memoryBoardStore';
import { useGameStore } from '@/stores/gameStore';
import axios from 'axios';

vi.mock('axios');
vi.mock('@/stores/memoryBoardStore', () => ({
  useMemoryBoardStore: vi.fn(),
}));
vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}));

describe('useMemoryBoard', () => {
  let storeMock: any;

  beforeEach(() => {
    storeMock = {
      shuffledCards: [
        { imageUrl: 'img1' },
        { imageUrl: 'img1' }
      ],
      timeElapsed: 10,
      attempts: 1,
      flippedCards: [],
      matchedCards: [],
      gameStarted: true,
      flipCard: vi.fn((index) => {
        storeMock.flippedCards.push(index);
      }),
      startGame: vi.fn(),
      incrementAttempts: vi.fn(),
      addMatchedCards: vi.fn((pair) => {
        storeMock.matchedCards.push(...pair);
        storeMock.flippedCards = [];
      })
    };

    (useMemoryBoardStore as any).mockReturnValue(storeMock);
    (useGameStore as any).mockReturnValue({});
  });

  it('should shuffle cards from fetched images', async () => {
    const mockedPhotos = Array.from({ length: 8 }).map((_, i) => ({
      src: { medium: `img${i + 1}` }
    }));

    (axios.get as any).mockResolvedValue({
      data: { photos: mockedPhotos }
    });

    const { fetchImages } = useMemoryBoard();
    await fetchImages();

    expect(storeMock.shuffledCards.length).toBe(16); // 8 duplicadas
  });

  it('should reset game state', () => {
    const { resetGame } = useMemoryBoard();
    storeMock.flippedCards = [1];
    resetGame();
    expect(storeMock.flippedCards).toEqual([]);
    expect(storeMock.timeElapsed).toBe(0);
    expect(storeMock.attempts).toBe(0);
    expect(storeMock.gameStarted).toBe(false);
  });

  it('should flip card and start timer on first flip', () => {
    const { flipCard } = useMemoryBoard();
    storeMock.flippedCards = [];
    flipCard(0);
    expect(storeMock.flipCard).toHaveBeenCalledWith(0);
    expect(storeMock.startGame).not.toHaveBeenCalled(); // já iniciado
  });

  it('should call emit on game finish', async () => {
    const emit = vi.fn();
    const { flipCard } = useMemoryBoard(emit);

    flipCard(0);
    flipCard(1);

    await new Promise(resolve => setTimeout(resolve, 1100));

    expect(emit).toHaveBeenCalledWith('game-finished', {
      time: 10,
      attempts: 1
    });
  });
});