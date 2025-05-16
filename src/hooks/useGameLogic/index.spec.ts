import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGameLogic } from './index';
import { useGameStore } from '@/stores/gameStore';

vi.mock('@/stores/gameStore', () => ({
  useGameStore: vi.fn(),
}));

describe('useGameLogic', () => {
  let startGame: any;
  let restartGame: any;
  let finishGame: any;

  beforeEach(() => {
    startGame = vi.fn();
    restartGame = vi.fn();
    finishGame = vi.fn();

    (useGameStore as any).mockReturnValue({
      startGame,
      restartGame,
      finishGame,
    });
  });

  it('should start the game', () => {
    const { startGame: start } = useGameLogic();
    start();
    expect(startGame).toHaveBeenCalled();
  });

  it('should restart the game and reset board', async () => {
    const { restartGame: restart, boardRef } = useGameLogic();
    boardRef.value = { resetGame: vi.fn().mockResolvedValue(undefined) };
    await restart();
    expect(restartGame).toHaveBeenCalled();
    expect(boardRef.value.resetGame).toHaveBeenCalled();
  });

  it('should finish the game with given data', () => {
    const { handleGameFinished } = useGameLogic();
    handleGameFinished({ time: 120, attempts: 10 });
    expect(finishGame).toHaveBeenCalledWith(120, 10);
  });

  it('should open the about modal', () => {
    const { showModal, openAboutModal } = useGameLogic();
    expect(showModal.value).toBe(false);
    openAboutModal();
    expect(showModal.value).toBe(true);
  });
});
