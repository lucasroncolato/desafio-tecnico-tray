import { mount } from '@vue/test-utils'
import Login from './index.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Login.vue', () => {
  const originalHref = window.location.href

  beforeEach(() => {
    // Limpa mocks e reseta href antes de cada teste
    vi.restoreAllMocks()
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: '',
        origin: 'http://localhost:5173'
      }
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        href: originalHref
      }
    })
  })

  it('deve renderizar o botão com o logo do Google', () => {
    const wrapper = mount(Login)

    const img = wrapper.find('img')
    const button = wrapper.find('button')

    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Logo do Google')
    expect(button.text()).toContain('Entrar com Google')
  })

  it('deve redirecionar para o login do Google ao clicar no botão', async () => {
    import.meta.env.VITE_GOOGLE_CLIENT_ID = 'mock-client-id'

    const wrapper = mount(Login)
    const button = wrapper.find('button')

    await button.trigger('click')

    const href = window.location.href
    expect(href).toContain('https://accounts.google.com/o/oauth2/v2/auth')
    expect(href).toContain('client_id=mock-client-id')
    expect(href).toContain('redirect_uri=http://localhost:5173/login/callback')
    expect(href).toContain('response_type=token')
    expect(href).toContain('scope=profile email')
  })
})
