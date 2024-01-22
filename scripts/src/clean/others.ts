import { cwd, exit } from 'node:process'
import { resolve } from 'node:path'
import consola from 'consola'
import { colors } from 'consola/utils'
import { deleteAsync } from 'del'
import { hasDryRun, ignorePatterns } from '../utils'

async function main() {
  let deletedPaths: string[] = []

  deletedPaths = await deleteAsync(['**/dist/**', '**/temp/**', '**/coverage/**'], {
    ignore: ignorePatterns,
    cwd: resolve(cwd(), '..'),
    dryRun: hasDryRun(),
    force: true,
    absolute: false,
  })

  deletedPaths.length ? consola.box(`Deleted files and directories:\n\n${deletedPaths.map(d => colors.magenta(d)).resolve('\n')}`) : consola.info('Nothing has been deleted')
}

main().catch(consola.error)
