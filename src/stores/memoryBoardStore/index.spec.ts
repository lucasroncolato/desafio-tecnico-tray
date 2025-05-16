import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useMemoryBoardStore } from './index';

describe('memoryBoardStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should start game and reset values', () => {
    const store = useMemoryBoardStore();
    store.startGame();

    expect(store.gameStarted).toBe(true);
    expect(store.attempts).toBe(0);
    expect(store.timeElapsed).toBe(0);
    expect(store.flippedCards).toEqual([]);
    expect(store.matchedCards).toEqual([]);
  });

  it('should finish game and record time and attempts', () => {
    const store = useMemoryBoardStore();
    store.finishGame(180, 7);

    expect(store.timeElapsed).toBe(180);
    expect(store.attempts).toBe(7);
  });

  it('should reset game state', () => {
    const store = useMemoryBoardStore();
    store.startGame();
    store.flipCard(1);
    store.resetGame();

    expect(store.flippedCards).toEqual([]);
    expect(store.matchedCards).toEqual([]);
    expect(store.attempts).toBe(0);
    expect(store.timeElapsed).toBe(0);
    expect(store.gameStarted).toBe(false);
  });

  it('should flip a card if valid', () => {
    const store = useMemoryBoardStore();
    store.matchedCards = [0];
    store.flippedCards = [];

    store.flipCard(1);

    expect(store.flippedCards).toContain(1);
  });

  it('should not flip an already flipped or matched card', () => {
    const store = useMemoryBoardStore();
    store.flippedCards = [1];
    store.matchedCards = [2];

    store.flipCard(1);
    store.flipCard(2);
    store.flipCard(3);

    expect(store.flippedCards).toContain(3);
    expect(store.flippedCards).not.toContain(2);
  });

  it('should add matched cards', () => {
    const store = useMemoryBoardStore();
    store.addMatchedCards([2, 5]);
    expect(store.matchedCards).toEqual([2, 5]);
  });

  it('should increment attempts', () => {
    const store = useMemoryBoardStore();
    store.incrementAttempts();
    expect(store.attempts).toBe(1);
  });
});