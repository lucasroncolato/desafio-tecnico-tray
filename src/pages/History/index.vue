<template>
  <div class="content">
    <div class="p-6 from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100">
      <div class="flex items-center justify-center content-center mb-4">
        <BaseButton @click="goBack" class="text-sm pr-4 cursor-pointer">
          ←
        </BaseButton>
        <h2 class="text-2xl font-bold">Histórico de Partidas</h2>
      </div>

      <div v-if="loading">Carregando...</div>
      <div v-else-if="games.length === 0">Nenhum jogo encontrado.</div>
      <ul v-else class="space-y-4">
        <li v-for="game in games" :key="game.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
          <p><strong>Tempo:</strong> {{ game.time }}s</p>
          <p><strong>Tentativas:</strong> {{ game.attempts }}</p>
          <p><strong>Data:</strong> {{ new Date(game.date).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { db } from '@/services/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

const router = useRouter()
const goBack = () => router.back()

const auth = useAuthStore()
const games = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const userName = auth.user?.name || ''
    const q = query(
      collection(db, "gamesummaries"),
      where("user", "==", userName),
      orderBy("date", "desc")
    )

    const querySnapshot = await getDocs(q)
    games.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Erro ao buscar histórico:', err)
  } finally {
    loading.value = false
  }
})
</script>