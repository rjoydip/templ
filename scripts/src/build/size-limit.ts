import { resolve } from 'node:path'
import { exit } from 'node:process'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { brotliCompress, gzip } from 'node:zlib'
import consola from 'consola'
import { colors } from 'consola/utils'
import { getProperty, hasProperty } from 'dot-prop'
import { table } from 'table'
import { splitByCase, upperFirst } from 'scule'
import { getPackagesAsync, prettyBytes, prettyBytesToNumber, root } from '../utils'

const gzipAsync = promisify(gzip)
const brotliAsync = promisify(brotliCompress)

interface SizeLimitError {
  name?: string
  limit?: string
}

interface SizeLimitResults {
  name?: string
  size?: string
  gzip?: string
  brotli?: string
  limit?: string
  inLimit?: boolean
}

interface SizeLimit {
  results: SizeLimitResults[]
  errors: SizeLimitError[]
}
/**
 * Retrieves the size information and limits for the packages asynchronously.
 *
 * @return {Promise<SizeLimit>} Promise that resolves to the size information and limits for the packages
 */
async function sizeLimit(): Promise<SizeLimit> {
  const packages = await getPackagesAsync()
  const results = await Promise.all(packages.map(async (p) => {
    const splittedEle = splitByCase(p, ['\\', '/'])
    const name = splittedEle[1] && splittedEle[1].length <= 3 ? splittedEle[1]?.toUpperCase() : upperFirst(splittedEle[1]?.toLowerCase() ?? '')
    const pkgPath = resolve(root, splittedEle[0] ?? '', splittedEle[1] ?? '', 'package.json')
    const pkgRaw = await readFile(pkgPath, {
      encoding: 'utf-8',
    })
    const limit = getProperty(JSON.parse(pkgRaw), 'size-limit', '1024 B')
    const minified = (await readFile(resolve(root, p), {
      encoding: 'utf-8',
    }))
    const size = prettyBytes(minified.length)
    const gzip = prettyBytes((await gzipAsync(minified)).length)
    const brotli = prettyBytes((await brotliAsync(minified)).length)

    const limitInBytes = prettyBytesToNumber(limit)
    const sizeInBytes = prettyBytesToNumber(size)
    const inLimit = sizeInBytes < limitInBytes

    return {
      name,
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
/**
 * Executes the run function asynchronously. It awaits the sizeLimit function and then calls the sizeLimitRenderer function with the results.
 *
 * @return {Promise<void>} A promise that resolves when the function completes execution.
 */
function sizeLimitRenderer(data: SizeLimit) {
  if (data.results && data.results.length)
    consola.box(table([Object.keys(data.results[0] ?? {}).map(i => upperFirst(i.toLowerCase())), ...data.results.map(r => Object.values(r))]))

  if (data.errors && data.errors.length) {
    consola.box(`${data.errors.map(e => colors.red(`${e.name} has exceded ${e.limit}`)).join('\n')}`)
    exit(1)
  }
}
/**
 * Executes the run function asynchronously. It awaits the sizeLimit function and then calls the sizeLimitRenderer function with the results.
 *
 * @return {Promise<void>} A promise that resolves when the function completes execution.
 */
export async function run() {
  const results = await sizeLimit()
  sizeLimitRenderer(results)
}

run().catch(consola.error)
