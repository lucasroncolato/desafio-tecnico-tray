<template>
  <Background>
    <div class="p-6 from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4">Histórico de Partidas</h2>
      <div v-if="loading">Carregando...</div>
      <div v-else-if="games.length === 0">Nenhum jogo encontrado.</div>
      <ul v-else class="space-y-4">
        <li
          v-for="game in games"
          :key="game.id"
          class="p-4 bg-white dark:bg-gray-800 rounded shadow-md"
        >
          <p><strong>Tempo:</strong> {{ game.time }}s</p>
          <p><strong>Tentativas:</strong> {{ game.attempts }}</p>
          <p><strong>Data:</strong> {{ new Date(game.date).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </Background>
</template>

<script setup lang="ts">
import Background from "@/components/elements/Background/index.vue";
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const auth = useAuthStore()
const games = ref<any[]>([])
const loading = ref(true)

const API_URL = 'http://localhost:3001/gamesummaries'

onMounted(async () => {
  try {
    const { data } = await axios.get(API_URL, {
      params: { user: auth.user?.name || '' },
    })
    games.value = data
  } catch (err) {
    console.error('Erro ao buscar histórico:', err)
  } finally {
    loading.value = false
  }
})
</script>
