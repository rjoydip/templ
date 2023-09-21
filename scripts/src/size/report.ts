// Copied from https://github.com/toeverything/blocksuite/blob/master/scripts/size-report.ts

import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { markdownTable } from 'markdown-table'
import prettyBytes from 'pretty-bytes'
import { root } from '@templ/utils'
import { pathToFileURL } from 'node:url'
import { platform } from 'node:os'

interface SizeResult {
  size: number
  gzip: number
  brotli: number
}

interface BundleResult extends SizeResult {
  file: string
}

type PackageResult = Record<string, SizeResult & { name: string }>

const currDir = resolve(root, 'temp/size')
const prevDir = resolve(root, 'temp/size-prev')
let output = '# Size Report\n\n'
const sizeHeaders = ['Size', 'Gzip', 'Brotli']

async function run() {
  await renderBundles()
  await renderPackages()
  process.stdout.write(output)
}

async function renderBundles() {
  const filterFiles = (files: string[]) =>
    files.filter((file) => !file.startsWith('_'))

  const curr = filterFiles(await readdir(currDir))
  const prev = existsSync(prevDir) ? filterFiles(await readdir(prevDir)) : []
  const fileList = new Set([...curr, ...prev])

  const rows: string[][] = []
  for (const file of fileList) {
    const currPath = resolve(currDir, file)
    const prevPath = resolve(prevDir, file)

    const curr = await importJSON<BundleResult>(currPath)
    const prev = await importJSON<BundleResult>(prevPath)
    const fileName = curr?.file || prev?.file || ''

    if (!curr) {
      rows.push([`~~${fileName}~~`])
    } else
      rows.push([
        fileName,
        `${prettyBytes(curr.size)}${getDiff(curr.size, prev?.size)}`,
        `${prettyBytes(curr.gzip)}${getDiff(curr.gzip, prev?.gzip)}`,
        `${prettyBytes(curr.brotli)}${getDiff(curr.brotli, prev?.brotli)}`,
      ])
  }

  output += '## Bundles\n\n'
  output += markdownTable([['Entry', ...sizeHeaders], ...rows])
  output += '\n'
}

async function renderPackages() {
  const curr = (await importJSON<PackageResult>(
    resolve(currDir, '_packages.json'),
  ))
  const prev = await importJSON<PackageResult>(
    resolve(prevDir, '_packages.json'),
  )
  output += '\n## Packages\n\n'

  const data = Object.values(curr)
    .map((usage) => {
      const prevUsage = prev?.[usage.name]
      const diffSize = getDiff(usage.size, prevUsage?.size)
      const diffGzipped = getDiff(usage.gzip, prevUsage?.gzip)
      const diffBrotli = getDiff(usage.brotli, prevUsage?.brotli)

      return [
        usage.name,
        `${prettyBytes(usage.size)}${diffSize}`,
        `${prettyBytes(usage.gzip)}${diffGzipped}`,
        `${prettyBytes(usage.brotli)}${diffBrotli}`,
      ]
    })
    .filter((usage): usage is string[] => !!usage)

  output += `${markdownTable([['Name', ...sizeHeaders], ...data])}\n\n`
}

async function importJSON<T>(path: string): Promise<T | undefined> {
  if (!existsSync(path)) return undefined
  return (await import(platform() === 'win32' ? pathToFileURL(path).href : path, { assert: { type: 'json' } })).default
}

function getDiff(curr: number, prev?: number) {
  if (prev === undefined) return ''
  const diff = curr - prev
  if (diff === 0) return ''
  const sign = diff > 0 ? '+' : ''
  return ` (**${sign}${prettyBytes(diff)}**)`
}

run()