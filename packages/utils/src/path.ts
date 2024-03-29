import { parse, resolve } from 'node:path'
import { cwd } from 'node:process'
import { findUp, findUpSync } from 'find-up'

// Root
export function getRootDirSync() {
  const root = findUpSync('pnpm-workspace.yaml') || findUpSync('.npmrc') || cwd()
  return parse(root).dir
}
export async function getRootDirAsync() {
  const root = await findUp('pnpm-workspace.yaml') || await findUp('.npmrc') || cwd()
  return parse(root).dir
}
// Packages
export function getPackagesDirSync() {
  return resolve(getRootDirSync(), 'packages')
}
export async function getPackagesDirAsync() {
  const root = await getRootDirAsync()
  return resolve(root, 'packages')
}
// Apps
export function getAppsDirSync() {
  return resolve(getRootDirSync(), 'apps')
}
export async function getAppsDirAsync() {
  const root = await getRootDirAsync()
  return resolve(root, 'apps')
}
