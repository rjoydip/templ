import { basename, resolve } from 'node:path'
import { platform } from 'node:os'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import { cancel, confirm, group, log, note, select, text } from '@clack/prompts'
import colors from 'picocolors'
import { $ } from 'zx'
import { installDependencies } from 'nypm'
import type { SpinnerType } from '.'

export interface AppsOptsType {
  name: symbol | string
  path: symbol | string
  type: symbol | string
  vite: {
    language: symbol | string
    template: symbol | string
  }
  next: {
    src_dir: symbol | boolean
    app_route: symbol | boolean
    eslint: symbol | boolean
    import_alias: symbol | boolean
    import_alias_value: symbol | string
    language: symbol | string
    tailwind: symbol | boolean
    template: symbol | string
  }
  vue: {
    cwd: string | null
    language: symbol | string
    jsx: symbol | boolean
    vue_route: symbol | boolean
    pinia: symbol | boolean
    vitest: symbol | boolean
    e2e_testing: symbol | boolean
    eslint: symbol | boolean
    prettier: symbol | boolean
  }
  nuxt: {
    cwd: string | null
    template: symbol | string
    log_level: symbol | string
    force: symbol | boolean
    offline: symbol | boolean
    prefer_offline: symbol | boolean
    git_init: symbol | boolean
    shell: symbol | boolean
  }
}

export const defaultAppsOpts = {
  name: '',
  path: '',
  type: '',
  vite: {
    language: '',
    template: '',
  },
  next: {
    src_dir: false,
    app_route: false,
    eslint: false,
    import_alias: false,
    import_alias_value: '',
    language: '',
    tailwind: false,
    template: '',
  },
  vue: {
    cwd: null,
    language: '',
    jsx: false,
    vue_route: false,
    pinia: false,
    vitest: false,
    e2e_testing: false,
    eslint: false,
    prettier: false,
  },
  nuxt: {
    cwd: null,
    template: '',
    log_level: '',
    force: false,
    offline: false,
    prefer_offline: false,
    git_init: false,
    shell: false,
  },
}

export async function create(root: string, packageManager: string, install: boolean = false, spinner: SpinnerType, apps: AppsOptsType) {
  const { type, next, path, name } = apps

  let dest = resolve(root, path.toString(), basename(name.toString()))
  dest = platform() === 'win32' ? resolve(dest.toString()).replace(/\\/g, '\\\\') : resolve(dest.toString())

  if (!existsSync(dest))
    await mkdir(dest)

  if (type === 'next') {
    const { language, tailwind, eslint, app_route, src_dir, import_alias, import_alias_value } = next
    spinner.start(`Creating ${name.toString()} documentation`)
    await $`npx create-next-app ${dest} ${language === 'javascript' ? '--js' : ''} ${tailwind ? '--tailwind' : ''} ${eslint ? '--eslint' : ''} ${app_route ? '--app' : ''} --src-dir ${src_dir} ${import_alias ? `--import-alias ${import_alias_value.toString()}` : '--import-alias'} ${!install ? `--no-use-${packageManager}` : `--use-${packageManager}`}`
    spinner.stop(`Generated ${name.toString()} documentation`)
  }

  if (install) {
    spinner.start(`Installing via ${packageManager}`)
    await installDependencies({
      cwd: dest,
      packageManager: {
        name: packageManager as 'pnpm' || 'bun' || 'npm' || 'yarn',
        command: packageManager === 'npm' ? 'npm install' : `${packageManager}`,
      },
      silent: true,
    })
    spinner.stop(`Installed via ${packageManager}`)
  }

  note(`cd ${dest}\n${install ? `${packageManager} dev` : `${packageManager} install\n${packageManager} dev`}`, 'Next steps.')

  log.success(`${colors.green(basename(name.toString()))} package created`)
}
export async function init() {
  return await group(
    {
      apps: async () => {
        const opts: AppsOptsType = defaultAppsOpts

        opts.path = await text({
          message: `Where should we create your ${colors.cyan('apps')}?`,
          placeholder: './apps',
          validate: (value: string) => {
            if (!value)
              return 'Please enter a path.'
            if (value[0] !== '.')
              return 'Please enter a relative path.'
            return void (0)
          },
        })

        const shouldDefaultName = await confirm({
          message: `Do you want to create with default ${colors.cyan('apps')} name?`,
          initialValue: false,
        })
        if (!shouldDefaultName) {
          opts.name = await text({
            message: `What is your ${colors.cyan('application')} name?`,
            placeholder: '',
            validate: (value: string) => {
              if (!value)
                return 'Please enter a name.'
              return void (0)
            },
          })
        }
        else {
          opts.name = 'apps'
        }

        const toolsOrFrameworkOpts = await select<any, string>({
          message: 'Select tools/framework.',
          options: [
            { value: 'next', label: 'Next' },
            { value: 'nuxt', label: 'Nuxt' },
            { value: 'vite', label: 'Vite' },
            { value: 'vue', label: 'Vue' },
          ],
          initialValue: 'next',
        })

        opts.type = toolsOrFrameworkOpts

        if (toolsOrFrameworkOpts === 'nuxt') {
          opts[toolsOrFrameworkOpts].template = await select<any, string>({
            message: 'Select template.',
            options: [
              { value: 'ui', label: 'Nuxt UI' },
              { value: 'content', label: 'Nuxt Content' },
              { value: 'module', label: 'Nuxt Module with Module Builder' },
              { value: 'layer', label: 'Nuxt Layer Starter with Extends (experimental)' },
              { value: 'module-devtools', label: 'Nuxt Module with Nuxt DevTools' },
              { value: 'v2', label: 'Nuxt 2' },
              { value: 'v2-bridge', label: 'Nuxt 2 + Bridge' },
            ],
          })

          opts[toolsOrFrameworkOpts].log_level = await select<any, string>({
            message: 'Select framework.',
            options: [
              { value: 'silent', label: 'Silent' },
              { value: 'info', label: 'Info' },
              { value: 'verbose', label: 'Verbose' },
            ],
          })

          opts[toolsOrFrameworkOpts].force = await confirm({
            message: 'Override existing directory?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].offline = await confirm({
            message: 'Force offline mode?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].prefer_offline = await confirm({
            message: 'Prefer offline mode?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].git_init = await confirm({
            message: 'Initialize git repository?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].shell = await confirm({
            message: 'Start shell after installation in project directory?',
            initialValue: false,
          })
        }

        if (toolsOrFrameworkOpts === 'vite') {
          const langOpts = await confirm({
            message: 'Would you like to use TypeScript?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].language = langOpts ? 'typescript' : 'javascript'

          if (langOpts === false) {
            const templateOpts = await select<any, string>({
              message: 'Select vite template (JavaScript).',
              options: [
                { value: 'vanilla', label: 'Vanilla' },
                { value: 'vue', label: 'Vue' },
                { value: 'react', label: 'React' },
                { value: 'preact', label: 'Preact' },
                { value: 'lit', label: 'Lit' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'solid', label: 'Solid' },
                { value: 'qwik', label: 'Qwik' },
              ],
              initialValue: 'vue',
            })

            opts[toolsOrFrameworkOpts].template = templateOpts
          }
          if (langOpts) {
            const templateOpts = await select<any, string>({
              message: 'Select vite template (TypeScript).',
              options: [
                { value: 'vanilla-ts', label: 'Vanilla' },
                { value: 'vue-ts', label: 'Vue' },
                { value: 'react-ts', label: 'React' },
                { value: 'preact-ts', label: 'Preact' },
                { value: 'lit-ts', label: 'Lit' },
                { value: 'svelte-ts', label: 'Svelte' },
                { value: 'solid-ts', label: 'Solid' },
                { value: 'qwik-ts', label: 'Qwik' },
              ],
              initialValue: 'vue-ts',
            })

            opts[toolsOrFrameworkOpts].template = templateOpts
          }
        }

        if (toolsOrFrameworkOpts === 'next') {
          const langOpts = await confirm({
            message: 'Would you like to use JavaScript?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].language = langOpts ? 'javascript' : 'typescript'

          opts[toolsOrFrameworkOpts].eslint = await confirm({
            message: 'Would you like to use ESLint?',
            initialValue: true,
          })

          opts[toolsOrFrameworkOpts].tailwind = await confirm({
            message: 'Would you like to use Tailwind CSS?',
            initialValue: true,
          })

          opts[toolsOrFrameworkOpts].src_dir = await confirm({
            message: `Initialize inside a ${colors.cyan('src')} directory`,
            initialValue: true,
          })

          opts[toolsOrFrameworkOpts].app_route = await confirm({
            message: `Would you like to use App Router? (${colors.cyan('recommended')})`,
            initialValue: true,
          })

          opts[toolsOrFrameworkOpts].import_alias = await confirm({
            message: 'Would you like to customize the default import alias?',
            initialValue: false,
          })

          if (opts[toolsOrFrameworkOpts].import_alias) {
            opts[toolsOrFrameworkOpts].import_alias_value = await text({
              message: 'Specify import alias to use (default "@/*")',
              placeholder: '@/*',
              initialValue: '@/*',
            })
          }
        }

        if (toolsOrFrameworkOpts === 'vue') {
          const langOpts = await confirm({
            message: 'Add TypeScript?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].language = langOpts ? 'typescript' : 'javascript'

          opts[toolsOrFrameworkOpts].jsx = await confirm({
            message: 'Add JSX Support?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].vue_route = await confirm({
            message: 'Add Vue Router for Single Page Application development?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].pinia = await confirm({
            message: 'Add Pinia for state management?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].vitest = await confirm({
            message: 'Add Vitest for Unit testing?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].e2e_testing = await confirm({
            message: 'Add an End-to-End Testing Solution?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].eslint = await confirm({
            message: 'Add ESLint for code quality?',
            initialValue: false,
          })

          opts[toolsOrFrameworkOpts].prettier = await confirm({
            message: 'Add Prettier for code formatting?',
            initialValue: false,
          })
        }

        return opts
      },
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.')
        exit(0)
      },
    },
  )
}
