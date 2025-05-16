<template>
  <header v-if="auth.user"
    class="flex justify-between items-center p-4 from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black  text-white shadow-md">
    <router-link to="/">
      <div class="text-xl font-bold">Jogo da Memória</div>
    </router-link>
    <div class="flex items-center gap-3">
      <router-link to="/history" class="text-sm hover:underline text-white">Histórico</router-link>
      <router-link to="/" class="text-sm hover:underline text-white">Jogar</router-link>
      <button @click="toggleTheme" class="ml-2 text-sm hover:underline text-white">
        {{ isDark ? 'Tema Claro' : 'Tema Escuro' }}
      </button>
      <button @click="logout" class="ml-2 text-sm hover:underline text-red-200">
        Sair
      </button>
      <img :src="auth.user.picture" alt="Avatar" class="w-10 h-10 rounded-full" />
      <span>{{ auth.user.name }}</span>
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
