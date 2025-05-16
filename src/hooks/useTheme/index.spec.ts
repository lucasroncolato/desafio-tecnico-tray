import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import { useTheme } from './index';

describe('useTheme', () => {
  const classListAdd = vi.fn();
  const classListRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();

    // Evita substituir o document inteiro
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          add: classListAdd,
          remove: classListRemove,
        },
      },
      configurable: true,
    });

    const localStorageMock = (() => {
      let store = { theme: '' };
      return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value;
        }),
        clear: () => {
          store = { theme: '' };
        }
      };
    })();

    vi.stubGlobal('localStorage', localStorageMock);
    localStorage.setItem('theme', 'dark');
  });

  it('should toggle theme from light to dark', () => {
    const { isDark, toggleTheme } = useTheme();

    expect(isDark.value).toBe(false);
    toggleTheme();

    expect(isDark.value).toBe(true);
    expect(classListAdd).toHaveBeenCalledWith('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should toggle theme from dark to light', () => {
    const { isDark, toggleTheme } = useTheme();

    isDark.value = true;
    toggleTheme();

    expect(isDark.value).toBe(false);
    expect(classListRemove).toHaveBeenCalledWith('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should initialize with dark mode if saved in localStorage', async () => {
    const wrapper = mount(defineComponent({
      setup() {
        const { isDark } = useTheme();
        return () => h('div', isDark.value ? 'dark' : 'light');
      }
    }));

    await nextTick();

    expect(wrapper.text()).toBe('dark');
    expect(classListAdd).toHaveBeenCalledWith('dark');
  });
});