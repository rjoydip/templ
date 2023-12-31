import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadPkg, loadTemplConfig } from '../src/load'

const fixturePath = join(__dirname, 'fixtures')
const fixture = (folder: string) => join(fixturePath, folder)

const defaultData = {}

describe('@templ/config > load config', () => {
  it('should be load package.json', async () => {
    const pkgData = await loadPkg(fixturePath)
    expect(pkgData).toBeDefined()
    expect(pkgData).toStrictEqual({
      name: 'config',
      templ: {},
    })
  })

  it('should be load templ.config.cjs', async () => {
    const { data } = await loadTemplConfig(fixture('1'))
    expect(data).toBeDefined()
    expect(data).toStrictEqual(defaultData)
  })

  it('should be load templ.config.js', async () => {
    const { data } = await loadTemplConfig(fixture('2'))
    expect(data).toBeDefined()
    expect(data).toStrictEqual(defaultData)
  })

  it('should be load templ.config.json', async () => {
    const { data } = await loadTemplConfig(fixture('3'))
    expect(data).toBeDefined()
    expect(data).toStrictEqual(defaultData)
  })

  it('should be load templ.config.mjs', async () => {
    const { data } = await loadTemplConfig(fixture('4'))
    expect(data).toBeDefined()
    expect(data).toStrictEqual(defaultData)
  })

  it('should be load templ.config.ts', async () => {
    const { data } = await loadTemplConfig(fixture('5'))
    expect(data).toBeDefined()
    expect(data).toStrictEqual(defaultData)
  })
})
