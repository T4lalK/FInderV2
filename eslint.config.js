import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import checkFile from 'eslint-plugin-check-file';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.css'],
    processor: 'check-file/eslint-processor-check-file',
    plugins: {
      'check-file': checkFile
    },
    rules: {
      'check-file/filename-blocklist': [
        'error',
        {
          'src/**/!(*.module|index).css': '*.module.css'
        },
        {
          errorMessage:
            'Plain CSS files are not allowed. Use a "*.module.css" CSS Module for component styles, or "src/index.css" for global styles.'
        }
      ]
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      // Pinned instead of 'detect': eslint-plugin-react's version detection
      // calls an old ESLint API removed in ESLint 10's flat config context.
      react: { version: '19.2.8' }
    },
    plugins: {
      'check-file': checkFile,
      '@eslint-community/eslint-comments': eslintComments,
      'simple-import-sort': simpleImportSort
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    rules: {
      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Forbid suppressing lint errors instead of fixing them
      '@eslint-community/eslint-comments/no-use': ['error', { allow: [] }],

      // Stricter TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true }
      ],

      // Stricter general JS
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'no-alert': 'error',
      'no-nested-ternary': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',

      // Stricter React
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'ignore', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

      // Filename / folder conventions
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/main.tsx': 'CAMEL_CASE',
          'src/**/!(main).tsx': 'PASCAL_CASE',
          '**/*.ts': 'CAMEL_CASE'
        },
        { ignoreMiddleExtensions: true }
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }]
    }
  }
]);
