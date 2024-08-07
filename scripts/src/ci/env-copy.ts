import { dirname, resolve, sep } from 'node:path'
import { cp } from 'node:fs/promises'
import consola from 'consola'
import { colors } from 'consola/utils'
import { globby } from 'globby'
import { splitByCase } from 'scule'
import { hasDryRun, ignorePatterns, root } from '../utils'

export async function run() {
  const files = await globby(['**/.env.sample'], {
    ignore: ignorePatterns,
    gitignore: false,
    absolute: true,
    cwd: root,
  })
  if (!hasDryRun()) {
    await Promise.all(
      files.map(async (f) => {
        await cp(f, resolve(dirname(f), '.env'), { force: true, recursive: true })
      }),
    )
    if (files.length)
      consola.success(`Env copied`)
    else
      consola.error('No env file found')
  }
  else {
    consola.box(`Would be copied \\n${files.map(d => colors.magenta((splitByCase(d, ['\\', '/']) ?? []).slice(0, 4).join(sep))).join('\n')}`)
  }
}

run().catch(consola.error)
