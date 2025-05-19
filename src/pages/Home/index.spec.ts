import { mount } from '@vue/test-utils'
import Home from '@/pages/Home/index.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('Home.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar os botões quando o jogo não começou', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            gameStore: { isGameStarted: false }
          },
          stubActions: false
        })]
      }
    })

    expect(wrapper.text()).toContain('Começar Jogo')
    expect(wrapper.text()).toContain('Histórico de Jogos')
  })

  it('deve chamar router.push ao clicar em Histórico de Jogos', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            gameStore: { isGameStarted: false }
          },
          stubActions: false
        })]
      }
    })

    const btn = wrapper.findAll('button')[1]
    await btn.trigger('click')
    expect(router.push).toHaveBeenCalledWith('/history')
  })
})
