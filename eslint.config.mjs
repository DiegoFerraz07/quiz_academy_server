import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: [globals.browser, globals.node],
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      indent: ['error', 2],
      'prettier/prettier': [
        'error',
        { singleQuote: true, trailingComma: 'all' },
      ],
      'no-console': 'off', // Permite console.log()
      'no-unused-vars': 'warn', // Apenas avisa sobre variáveis não usadas
      'import/no-unresolved': 'error', // Evita erro ao importar módulos
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
  eslint.configs.recommended,
  prettier,
];
