import { mount } from '@vue/test-utils'
import Login from './index.vue'
import { describe, it, expect, vi } from 'vitest'

// Mock para o window.location.href
const originalLocation = window.location

describe('Login.vue', () => {
  beforeEach(() => {
    delete (window as any).location
    window.location = { href: '', origin: 'http://localhost:5173' } as any
  })

  afterEach(() => {
    window.location = originalLocation
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

    expect(window.location.href).toContain('https://accounts.google.com/o/oauth2/v2/auth')
    expect(window.location.href).toContain('client_id=mock-client-id')
    expect(window.location.href).toContain('redirect_uri=http://localhost:5173/login/callback')
    expect(window.location.href).toContain('response_type=token')
    expect(window.location.href).toContain('scope=profile email')
  })
})
