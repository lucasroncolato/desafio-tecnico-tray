<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const token = new URLSearchParams(window.location.hash.substring(1)).get('access_token')?.trim()

  if (token) {
    localStorage.setItem('token', token)
    auth.setToken(token)

    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    auth.setUser({
      name: data.name,
      email: data.email,
      picture: data.picture,
    })

    router.push('/home')
  } else {
    router.push('/')
  }
})
</script>
