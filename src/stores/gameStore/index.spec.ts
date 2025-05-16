import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './index';

describe('gameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should start the game', () => {
    const store = useGameStore();
    store.startGame();
    expect(store.isGameStarted).toBe(true);
  });

  it('should finish the game and record time and attempts', () => {
    const store = useGameStore();
    store.finishGame(150, 8);

    expect(store.timeElapsed).toBe(150);
    expect(store.attempts).toBe(8);
    expect(store.gameFinished).toBe(true);
  });

  it('should restart the game and reset state', () => {
    const store = useGameStore();
    store.startGame();
    store.finishGame(200, 10);
    store.restartGame();

    expect(store.isGameStarted).toBe(false);
    expect(store.gameFinished).toBe(false);
    expect(store.timeElapsed).toBe(0);
    expect(store.attempts).toBe(0);
  });
});