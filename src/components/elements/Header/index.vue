<template>
  <header class="flex justify-between items-center p-4 bg-blue-600 dark:bg-blue-950 text-white shadow-md">
    <div class="text-xl font-bold">Jogo da Memória</div>
    <div v-if="auth.user" class="flex items-center gap-3">
      <img :src="auth.user.picture" alt="Avatar" class="w-10 h-10 rounded-full" />
      <span>{{ auth.user.name }}</span>
      <router-link to="/history" class="text-sm hover:underline text-white">Histórico</router-link>
      <button @click="toggleTheme" class="ml-2 text-sm hover:underline text-white">
        {{ isDark ? 'Tema Claro' : 'Tema Escuro' }}
      </button>
      <button @click="logout" class="ml-2 text-sm hover:underline text-red-200">
        Sair
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useTheme } from '@/hooks/useTheme'

const auth = useAuthStore()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

function logout() {
  auth.logout()
  router.push('/')
}
</script>
