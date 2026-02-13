import { FlatCompat } from '@eslint/eslintrc';
import pluginQuery from '@tanstack/eslint-plugin-query';
import boundaries from 'eslint-plugin-boundaries';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const FSD_LAYERS = ['app', 'widgets', 'features', 'entities', 'shared'];

const FSD_LAYERS_REG_EXP = FSD_LAYERS.join('|');

const eslintConfig = [
  {
    ignores: ['src/shared/types/generated/'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...pluginQuery.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
    },
  },
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', mode: 'folder' },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
          capture: ['sliceName'],
          mode: 'folder',
        },
        {
          type: 'features',
          pattern: 'src/features/*',
          capture: ['sliceName'],
          mode: 'folder',
        },
        {
          type: 'entities',
          pattern: 'src/entities/*',
          capture: ['sliceName'],
          mode: 'folder',
        },
        { type: 'shared', pattern: 'src/shared', mode: 'folder' },
      ],
      'boundaries/include': [`src/(${FSD_LAYERS_REG_EXP})/**`],
    },
    rules: {
      'boundaries/element-types': [
        'warn',
        {
          default: 'disallow',
          rules: [
            {
              from: 'app',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: ['features', 'entities', 'shared'],
            },
            {
              from: 'features',
              allow: ['entities', 'shared'],
            },
            {
              from: 'entities',
              allow: ['shared'],
            },
            {
              from: 'shared',
              allow: ['shared'],
            },
          ],
        },
      ],
      'boundaries/entry-point': [
        'warn',
        {
          default: 'disallow',
          rules: [
            {
              target: ['shared'],
              allow: '**',
            },
            {
              target: ['features'],
              allow: 'index.(ts|tsx)',
            },
            {
              target: ['entities'],
              allow: 'index.(ts|tsx)',
            },
            {
              target: ['widgets'],
              allow: 'index.(ts|tsx)',
            },
            {
              target: ['app'],
              allow: '**',
            },
          ],
        },
      ],
      'boundaries/no-unknown': ['warn'],
      'boundaries/no-unknown-files': ['warn'],
    },
  },
];

export default eslintConfig;
