import { describe, expectTypeOf, test } from 'vitest'
import type { BuildOptions, CompileType, DTSPlugin, Format, NonBuildOptions } from '../src/types'

describe('@templ/build > Types', () => {
  test('should validate that the value is of type CompileType', () => {
    expectTypeOf<CompileType>().toMatchTypeOf<'esbuild' | 'rollup'>()
  })
  test('should validate that the value is of type FormatSchema', () => {
    expectTypeOf<Format>().toMatchTypeOf<'cjs' | 'esm' | 'iife'>()
  })
  test('should validate that the value is of type NonBuildOptions', () => {
    expectTypeOf<NonBuildOptions>().toMatchTypeOf<{
      assets?: string[]
      clean?: boolean
      dts?: boolean
      excludes?: string[]
      includes?: string[]
      srcDir?: string
      type?: string
      watch?: boolean
    }>()
  })
  test('should validate that the value is of type NonBuildOptions', () => {
    expectTypeOf<BuildOptions>().toMatchTypeOf<{
      format?: Format[]
      minify?: boolean
      outDir?: string
      esnext?: string
    }>()
  })
  test('should validate that the value is of type DTSPlugin', () => {
    expectTypeOf<DTSPlugin>().toMatchTypeOf<{
      debug?: boolean
      outDir?: string
      tsconfig?: string
    }>()
  })
})
