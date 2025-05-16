import { mount } from '@vue/test-utils'
import BaseModal from '@/components/elements/BaseModal/index.vue'

describe('BaseModal', () => {
  it('renderiza o conteúdo do slot quando show=true', () => {
    const wrapper = mount(BaseModal, {
      props: { show: true },
      slots: { default: '<div class="conteudo">Modal aberto</div>' }
    })
    expect(wrapper.html()).toContain('Modal aberto')
  })

  it('não renderiza quando show=false', () => {
    const wrapper = mount(BaseModal, {
      props: { show: false },
      slots: { default: '<div>Modal fechado</div>' }
    })
    expect(wrapper.html()).not.toContain('Modal fechado')
  })

  it('emite evento close ao clicar no botão de fechar', async () => {
    const wrapper = mount(BaseModal, {
      props: { show: true, showClose: true }
    })
    const closeBtn = wrapper.find('button')
    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
