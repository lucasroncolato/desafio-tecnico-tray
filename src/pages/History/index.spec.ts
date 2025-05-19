import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HistoryPage from '@/pages/History/index.vue'
import axios from 'axios'
import { createTestingPinia } from '@pinia/testing'

vi.mock('axios')
vi.mock('vue-router', () => ({
  useRouter: () => ({ back: vi.fn() })
}))

describe('HistoryPage.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => JSON.stringify({ name: 'Lucas', picture: 'pic.jpg' })),
      setItem: vi.fn(),
    })
  })

  it('renderiza carregando corretamente', () => {
    const wrapper = mount(HistoryPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    expect(wrapper.text()).toContain('Carregando...')
  })

  it('renderiza mensagem de nenhum jogo se a lista estiver vazia', async () => {
    (axios.get as any).mockResolvedValueOnce({ data: [] })
    const wrapper = mount(HistoryPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    await flushPromises()
    expect(wrapper.text()).toContain('Nenhum jogo encontrado.')
  })

  it('renderiza lista de jogos corretamente', async () => {
    const mockData = [
      { id: 1, time: 30, attempts: 4, date: new Date().toISOString() },
      { id: 2, time: 45, attempts: 6, date: new Date().toISOString() }
    ]
    ;(axios.get as any).mockResolvedValueOnce({ data: mockData })

    const wrapper = mount(HistoryPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    await flushPromises()
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('30s')
    expect(wrapper.text()).toContain('4')
    expect(wrapper.text()).toContain('45s')
    expect(wrapper.text()).toContain('6')
  })
})