import { on } from 'node:process'
import { serve } from '@hono/node-server'
import consola from 'consola'
import { colors } from 'consola/utils'
import app from './app'

const server = serve({
  fetch: app.fetch,
  port: 3000,
}).on('listening', () => consola.log(colors.green(`🔥 Templ server running on ${colors.cyan(3000)}`)))

on('SIGINT', () => {
  consola.log('Ctrl-C was pressed')
  server.close()
})
