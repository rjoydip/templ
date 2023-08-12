import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import polka from 'polka'
import serveStatic from 'serve-static'
import { compile } from 'tempura'

const { PORT = 3000 } = process.env
const template = await readFile('index.hbs', 'utf8')
const render = compile(template)

polka()
  .use(
    '/cli',
    serveStatic(join(process.cwd(), '..', 'packages', 'cli', 'docs')),
  )
  .use(
    '/config',
    serveStatic(join(process.cwd(), '..', 'packages', 'config', 'docs')),
  )
  .use(
    '/core',
    serveStatic(join(process.cwd(), '..', 'packages', 'core', 'docs')),
  )
  .use('/ui', serveStatic(join(process.cwd(), '..', 'packages', 'ui', 'docs')))
  .use(
    '/utils',
    serveStatic(join(process.cwd(), '..', 'packages', 'utils', 'docs')),
  )
  .get('/', (_, res) => {
    res.setHeader('Content-Type', 'text/html')
    const htmlContent = render({
      docs: [
        { id: 1, title: 'Cli', link: '/cli' },
        { id: 2, title: 'Config', link: '/config' },
        { id: 3, title: 'Core', link: '/core' },
        { id: 4, title: 'UI', link: '/ui' },
        { id: 5, title: 'Utils', link: '/utils' },
      ],
    })
    res.end(htmlContent)
  })
  .get('/health', (_, res) => {
    res.end('OK')
  })
  .listen(PORT, () => {
    console.log(`> Running on localhost:${PORT}`)
  })
