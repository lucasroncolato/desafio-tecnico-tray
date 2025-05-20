import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveGameSummary } from './index'

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore')
  return {
    ...actual,
    getFirestore: vi.fn(),
    collection: vi.fn(() => 'fakeCollectionRef'), // <-- corrigido aqui
    addDoc: vi.fn(),
  }
})

describe('saveGameSummary', () => {
  const mockSummary = {
    user: 'test_user',
    time: 120,
    attempts: 5,
    date: '2023-01-01'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('salva resumo do jogo com sucesso no Firestore', async () => {
    const { addDoc } = await import('firebase/firestore')
    const logSpy = vi.spyOn(console, 'log')

    await saveGameSummary(mockSummary)

    expect(addDoc).toHaveBeenCalledWith('fakeCollectionRef', mockSummary)
    expect(logSpy).toHaveBeenCalledWith('Resumo do jogo salvo com sucesso no Firestore.')
  })

  it('log de erro se falhar ao salvar', async () => {
    const { addDoc } = await import('firebase/firestore')
    const error = new Error('Erro ao salvar')
    ;(addDoc as any).mockRejectedValueOnce(error)

    const errorSpy = vi.spyOn(console, 'error')
    await saveGameSummary(mockSummary)

    expect(errorSpy).toHaveBeenCalledWith('Erro ao salvar o resumo do jogo no Firestore:', error)
  })
})
