const config = {
  'ignoreBinaries': ['templ-cli'],
  'ignoreDependencies': ['typecheck'],
  'workspaces': {
    '.': {
      entry: ['eslint.config.js'],
      ignore: ['**/templates/**', '**/example/**', '**/.config/**'],
    },
    'packages/*': {
      entry: ['src/**/*.{ts,tsx}', 'test/**/*.test.{ts,tsx}', '**/*.load.ts', '**/.storybook/*.{js,ts}'],
      ignore: ['**/test/**', '**/*.story.{ts,tsx}'],
    },
    'apps/*': {
      entry: ['src/**/*.{ts,tsx}', 'test/**/*.test.{ts,tsx}', '**/*.config.js'],
    },
  },
  'eslint': {
    config: [
      'eslint.config.js',
      '.eslintrc',
      '.eslintrc.{js,json,cjs}',
      '.eslintrc.{yml,yaml}',
      'package.json',
    ],
  },
  'github-actions': {
    config: ['.github/workflows/*.{yml,yaml}', '.github/**/action.{yml,yaml}'],
  },
  'lefthook': {
    config: [
      'lefthook.yml',
      '.git/hooks/prepare-commit-msg',
      '.git/hooks/commit-msg',
      '.git/hooks/pre-{applypatch,commit,merge-commit,push,rebase,receive}',
      '.git/hooks/post-{checkout,commit,merge,rewrite}',
    ],
  },
  'next': {
    entry: [
      'next.config.{js,ts,cjs,mjs}',
      '{instrumentation,middleware}.{js,ts}',
      'app/global-error.{js,jsx,ts,tsx}',
      'app/**/{error,layout,loading,not-found,page,template}.{js,jsx,ts,tsx}',
      'app/**/{route,default}.{js,ts}',
      'app/{manifest,sitemap,robots}.{js,ts}',
      'app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
      'app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
      'pages/**/*.{js,jsx,ts,tsx}',
      'src/{instrumentation,middleware}.{js,ts}',
      'src/app/global-error.{js,jsx,ts,tsx}',
      'src/app/**/{error,layout,loading,not-found,page,template}.{js,jsx,ts,tsx}',
      'src/app/**/{route,default}.{js,ts}',
      'src/app/{manifest,sitemap,robots}.{js,ts}',
      'src/app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
      'src/app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
      'src/pages/**/*.{js,jsx,ts,tsx}',
    ],
  },
  'npm-package-json-lint': {
    config: [
      'package.json',
    ],
    project: ['app/**', 'packages/**', 'generator', 'scripts'],
  },
  'postcss': {
    config: ['postcss.config.{cjs,js}', 'postcss.config.json', 'package.json'],
  },
  'storybook': {
    config: ['.storybook/{main,test-runner}.{js,ts}'],
    entry: [
      '.storybook/{manager,preview}.{js,jsx,ts,tsx}',
      '**/*.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))',
    ],
    project: ['.storybook/**/*.{js,jsx,ts,tsx}'],
  },
  'tailwind': {
    config: ['tailwind.config.{js,cjs,mjs,ts}'],
  },
  'typescript': {
    config: ['tsconfig.json', 'tsconfig.*.json'],
  },
  'vite': {
    config: ['vite*.config.{js,mjs,ts,cjs,mts,cts}'],
  },
  'vitest': {
    config: [
      'vitest*.config.{js,mjs,ts,cjs,mts,cts}',
      'vitest.{workspace,projects}.{ts,js,json}',
    ],
    entry: ['**/*.{test,test-d,spec}.?(c|m)[jt]s?(x)'],
  },
}

export default config
