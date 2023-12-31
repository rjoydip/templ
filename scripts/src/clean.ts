import { argv } from 'node:process'
import colors from 'picocolors'
import { deleteAsync } from 'del'
import parser from 'yargs-parser'
import { intro, log, outro } from '@clack/prompts'
import { getRootAsync } from './utils'

async function main() {
  const root = await getRootAsync()
  const { dryRun = false } = parser(argv.splice(2), {
    configuration: {
      'boolean-negation': false,
    },
  })

  intro('Clean')

  const deletedPaths = await deleteAsync(['**/dist', '**/coverage', 'docs/.vitepress'], {
    ignore: ['node_modules'],
    cwd: root,
    dryRun,
  })

  log.message(`Deleted files and directories:\n\n${deletedPaths.map(d => colors.green(d.replace(root, '.'))).join('\n')}`)

  outro('All set')
}

main().catch(console.error)
