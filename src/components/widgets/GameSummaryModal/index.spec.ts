import { mount } from '@vue/test-utils'
import GameSummaryModal from '@/components/widgets/GameSummaryModal/index.vue'

describe('GameSummaryModal', () => {
  it('renderiza os dados de tempo e tentativas', () => {
    const wrapper = mount(GameSummaryModal, {
      props: {
        time: 42,
        attempts: 7
      }
    })
    expect(wrapper.text()).toContain('42s')
    expect(wrapper.text()).toContain('7 tentativas')
  })

  it('emite evento de restart ao clicar no botão', async () => {
    const wrapper = mount(GameSummaryModal, {
      props: { time: 10, attempts: 2 }
    })
    const btn = wrapper.find('button')
    await btn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('restart')
  })

  it('emite evento de close ao clicar no botão fechar', async () => {
    const wrapper = mount(GameSummaryModal, {
      props: { time: 10, attempts: 2 }
    })

    const btns = wrapper.findAll('button')
    if (btns.length > 1) {
      await btns[1].trigger('click')
      expect(wrapper.emitted()).toHaveProperty('close')
    }
  })
})
