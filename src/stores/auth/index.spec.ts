import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from './index';

describe('auth store', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key) => {
        delete store[key];
      }),
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('sets token and stores in localStorage', () => {
    const store = useAuthStore();
    store.setToken('abc123');

    expect(store.token).toBe('abc123');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
  });

  it('sets user and stores in localStorage', () => {
    const store = useAuthStore();
    const mockUser = { name: 'Test', email: 'test@example.com', picture: 'pic.jpg' };

    store.setUser(mockUser);

    expect(store.user).toEqual(mockUser);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  it('logout clears token and user', () => {
    const store = useAuthStore();
    store.setToken('abc123');
    store.setUser({ name: 'Test', email: 'test@example.com', picture: 'pic.jpg' });

    store.logout();

    expect(store.token).toBe('');
    expect(store.user).toBe(null);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('isAuthenticated returns true only when token exists', () => {
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(false);

    store.setToken('valid-token');
    expect(store.isAuthenticated).toBe(true);
  });
});