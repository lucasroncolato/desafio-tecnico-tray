import axios from 'axios'

interface GameSummary {
  user: string
  time: number
  attempts: number
  date: string
}

const API_URL = 'http://localhost:3001/gamesummaries' // json-server local

export async function saveGameSummary(summary: GameSummary): Promise<void> {
  try {
    await axios.post(API_URL, summary)
    console.log('Resumo do jogo salvo com sucesso.')
  } catch (error) {
    console.error('Erro ao salvar o resumo do jogo:', error)
  }
}
