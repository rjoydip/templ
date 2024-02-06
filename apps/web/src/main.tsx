import { render } from 'preact'
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router'
import { auth } from './utils/auth'
import { Spinner } from './components/Spinner'
import { routeTree } from './routeTree.gen'
import { useSessionStorage } from './hooks/useSessionStorage'
import './main.css'

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }: { error: any }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const [loaderDelay, setLoaderDelay] = useSessionStorage('loaderDelay', 500)
  const [pendingMs, setPendingMs] = useSessionStorage('pendingMs', 1000)
  const [pendingMinMs, setPendingMinMs] = useSessionStorage('pendingMinMs', 500)

  return (
    <div>
      <div className="text-xs fixed w-52 shadow-md shadow-black/20 rounded bottom-2 left-2 bg-white bg-opacity-75 border-b flex flex-col gap-1 flex-wrap items-left divide-y divide-gray-500/20">
        <div className="p-2 space-y-2">
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white rounded p-1 px-2"
              onClick={() => {
                setLoaderDelay(150)
              }}
            >
              Fast
            </button>
            <button
              className="bg-blue-500 text-white rounded p-1 px-2"
              onClick={() => {
                setLoaderDelay(500)
              }}
            >
              Fast 3G
            </button>
            <button
              className="bg-blue-500 text-white rounded p-1 px-2"
              onClick={() => {
                setLoaderDelay(2000)
              }}
            >
              Slow 3G
            </button>
          </div>
          <div>
            <div>
              Loader Delay:
              {loaderDelay}
              ms
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={loaderDelay}
              onChange={(e) => {
                if (e.target) {
                  const { valueAsNumber } = e.target as HTMLInputElement
                  setLoaderDelay(valueAsNumber)
                }
              }}
              className="w-full"
            />
          </div>
        </div>
        <div className="p-2 space-y-2">
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white rounded p-1 px-2"
              onClick={() => {
                setPendingMs(1000)
                setPendingMinMs(500)
              }}
            >
              Reset to Default
            </button>
          </div>
          <div>
            <div>
              defaultPendingMs:
              {pendingMs}
              ms
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={pendingMs}
              onChange={(e) => {
                if (e.target) {
                  const { valueAsNumber } = e.target as HTMLInputElement
                  setPendingMs(valueAsNumber)
                }
              }}
              className="w-full"
            />
          </div>
          <div>
            <div>
              defaultPendingMinMs:
              {pendingMinMs}
              ms
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={pendingMinMs}
              onChange={(e) => {
                if (e.target) {
                  const { valueAsNumber } = e.target as HTMLInputElement
                  setPendingMinMs(valueAsNumber)
                }
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        defaultPendingMs={pendingMs}
        defaultPendingMinMs={pendingMinMs}
        context={{
          auth,
        }}
      />
    </div>
  )
}

render(<App />, document.getElementById('app')!)
