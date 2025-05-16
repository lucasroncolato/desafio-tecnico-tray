import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MemoryCard from '@/components/widgets/MemoryCard/MemoryCard.vue'

describe('MemoryCard.vue', () => {
  it('deve emitir o evento flip ao clicar na carta', async () => {
    const wrapper = mount(MemoryCard, {
      props: {
        card: { id: 1, imageUrl: 'some-image.jpg' },
        isFlipped: false,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted().flip).toBeTruthy()
  })
})
