import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  jsonc: true,
  markdown: true,
}, {
  ignores: ['**/app/{docs,web}', '**/fixtures', '**/templates'],
  rules: {
    'antfu/no-import-dist': 'off',
  },
}, {
  files: ['**/*.bench.ts'],
  rules: {
    'test/consistent-test-it': 'off',
  },
}, {
  files: ['**/*.gen.ts'],
  rules: {
    'eslint-comments/no-unlimited-disable': 'off',
  },
})
