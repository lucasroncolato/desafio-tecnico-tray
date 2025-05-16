import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { saveGameSummary } from './index';

vi.mock('axios');

describe('saveGameSummary', () => {
  const mockSummary = {
    user: 'test_user',
    time: 120,
    attempts: 5,
    date: '2023-01-01'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should post game summary successfully', async () => {
    (axios.post as any).mockResolvedValueOnce({});
    const logSpy = vi.spyOn(console, 'log');

    await saveGameSummary(mockSummary);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/gamesummaries', mockSummary);
    expect(logSpy).toHaveBeenCalledWith('Resumo do jogo salvo com sucesso.');
  });

  it('should log error if post fails', async () => {
    const error = new Error('Erro ao salvar');
    (axios.post as any).mockRejectedValueOnce(error);
    const errorSpy = vi.spyOn(console, 'error');

    await saveGameSummary(mockSummary);

    expect(errorSpy).toHaveBeenCalledWith('Erro ao salvar o resumo do jogo:', error);
  });
});
