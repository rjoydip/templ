import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: true,
  json: true,
  jsonc: true,
  yml: true,
  markdown: true,
}, {
  ignores: ['**/docs', '**/fixtures', '**/templates'],
  rules: {
    'antfu/no-import-dist': 'off',
  },
})
