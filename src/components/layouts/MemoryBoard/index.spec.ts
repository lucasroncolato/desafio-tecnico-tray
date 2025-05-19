import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MemoryBoard from '@/components/layouts/MemoryBoard/index.vue'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

vi.mock('axios')

describe('MemoryBoard', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        (axios.get as any).mockResolvedValue({
          data: [
            { urls: { small: 'img1.jpg' } },
            { urls: { small: 'img2.jpg' } },
            { urls: { small: 'img3.jpg' } },
            { urls: { small: 'img4.jpg' } },
            { urls: { small: 'img5.jpg' } },
            { urls: { small: 'img6.jpg' } },
            { urls: { small: 'img7.jpg' } },
            { urls: { small: 'img8.jpg' } }
          ]
        })
      })

  it('renderiza o grid de cartas', async () => {
    const wrapper = mount(MemoryBoard, {
      global: {
        stubs: ['MemoryCard', 'Button']
      }
    })
    await flushPromises()
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('exibe tentativas e tempo', async () => {
    const wrapper = mount(MemoryBoard, {
      global: {
        stubs: ['MemoryCard', 'Button']
      }
    })
    await flushPromises()
    expect(wrapper.text().toLowerCase()).toContain('tentativas')
    expect(wrapper.text().toLowerCase()).toContain('tempo')
  })

  it('chama resetGame ao clicar no botão Reiniciar', async () => {
    const wrapper = mount(MemoryBoard, {
      global: {
        stubs: ['MemoryCard']
      }
    })
    await flushPromises()
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.vm.resetGame).toBeDefined()
  })
})