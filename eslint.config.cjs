const vue = require('eslint-plugin-vue');
const vueParser = require('vue-eslint-parser');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['essential'].rules,
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
];
