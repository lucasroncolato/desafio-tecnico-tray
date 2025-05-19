import { mount } from '@vue/test-utils'
import LoginCallback from './index.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'User Test', email: 'user@example.com', picture: '' })
  })
))

describe('LoginCallback.vue', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    vi.clearAllMocks()
    window.location.hash = ''
  })

  function setupTestWithHash(hashValue?: string) {
    if (hashValue) window.location.hash = hashValue

    router = createRouter({
      history: createWebHistory(),
      routes: []
    })

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    const wrapper = mount(LoginCallback, {
      global: {
        plugins: [pinia, router]
      }
    })

    return { wrapper, router, authStore: useAuthStore() }
  }

  it('deve salvar o token e redirecionar para "/"', async () => {
    const { authStore } = setupTestWithHash('#access_token=mock_token')

    await new Promise((r) => setTimeout(r, 0)) // espera o onMounted

    expect(authStore.token).toBe('mock_token')
    expect(authStore.user?.name).toBe('User Test')
  })

  it('não deve redirecionar se o token não estiver presente', async () => {
    const { authStore } = setupTestWithHash()

    await new Promise((r) => setTimeout(r, 0))

    expect(authStore.token).toBe(null)
  })
})
