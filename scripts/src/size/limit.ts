import { join } from 'node:path'
import { argv, cwd, exit } from 'node:process'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { brotliCompress, gzip } from 'node:zlib'
import { note } from '@clack/prompts'
import { getProperty, hasProperty } from 'dot-prop'
import colors from 'picocolors'
import { table } from 'table'
import parser from 'yargs-parser'
import { getPackagesAsync, prettyBytes, prettyBytesToNumber } from '../utils'

const gzipAsync = promisify(gzip)
const brotliAsync = promisify(brotliCompress)

interface SizeLimitError {
  name?: string
  limit?: string
}

interface SizeLimitResults {
  name: string
  size: string
  gzip: string
  brotli: string
  limit: string
  inLimit: boolean
}

interface SizeLimit {
  results: SizeLimitResults[]
  errors: SizeLimitError[]
}

export async function sizeLimit(): Promise<SizeLimit> {
  const results = await Promise.all((await getPackagesAsync()).map(async (p) => {
    const pkgPath = join(cwd(), '..', 'packages', p)
    const pkgRaw = await readFile(join(pkgPath, 'package.json'), {
      encoding: 'utf-8',
    })
    const limit = getProperty(JSON.parse(pkgRaw), 'size-limit', '1024') || '1024'
    const minified = (await readFile(join(pkgPath, 'dist', 'index.js'), {
      encoding: 'utf-8',
    }))
    const size = prettyBytes(minified.length)
    const gzip = prettyBytes((await gzipAsync(minified)).length)
    const brotli = prettyBytes((await brotliAsync(minified)).length)
    const limitInBytes = prettyBytesToNumber(limit)
    const sizeInBytes = prettyBytesToNumber(size)
    const inLimit = sizeInBytes < limitInBytes

    return {
      name: p,
      size,
      gzip,
      brotli,
      limit,
      inLimit,
    }
  }))

  const errors = results.map((r) => {
    const { inLimit, name, limit } = r
    if (!inLimit) {
      return {
        name,
        limit,
      }
    }
    return {}
  }).filter(n => ((hasProperty(n, 'limit') && hasProperty(n, 'name')) && (!!getProperty(n, 'limit') && !!getProperty(n, 'name'))))

  return {
    results,
    errors,
  }
}

export function sizeLimitRenderer(data: SizeLimit) {
  if (data.results && data.results.length)
    note(table([Object.keys(data.results[0] ?? {}), ...data.results.map(r => Object.values(r))]), 'Size Limit')

  if (data.errors && data.errors.length) {
    note(`\n ${data.errors.map(e => colors.red(`${e.name} has exceded ${e.limit}`)).join('\n')} \n`, 'Size Limit')
    exit(1)
  }
}

const {
  dryRun,
} = parser(argv.slice(2), {
  configuration: {
    'boolean-negation': false,
  },
})

if (dryRun) {
  (async () => {
    const results = await sizeLimit()
    sizeLimitRenderer(results)
  })()
}