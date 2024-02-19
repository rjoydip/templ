import { defineProject, mergeConfig } from 'vitest/config'
import { getVitestConfig } from '@templ/config'

export default mergeConfig(
  getVitestConfig(),
  defineProject({}),
)
