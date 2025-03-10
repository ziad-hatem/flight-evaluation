import { FlatCompat } from '@eslint/eslintrc';
import * as tsParser from '@typescript-eslint/parser';
const compat = new FlatCompat();

export default [
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**/*', '.next/**/*'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@next/next/no-img-element': 'off'
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];
