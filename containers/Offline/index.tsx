import { useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { useObjectState } from 'services'

export interface Props extends ReactProps {}
interface State {
  isOnline: boolean
}

const Offline: FC<Props> = ({ children }) => {
  const [{ isOnline }, setState] = useObjectState<State>({
    isOnline: true
  })

  const onOnline = useCallback(() => setState({ isOnline: true }), [])

  const onOffline = useCallback(() => setState({ isOnline: false }), [])

  const ping = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = () => resolve(false)
      xhr.ontimeout = () => resolve(false)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          resolve(!!xhr.status)
        }
      }
      xhr.open('GET', 'https://httpbin.org/get')
      xhr.timeout = 5000
      xhr.send()
    })
  }, [])

  useEffect(() => {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    let pollingId: NodeJS.Timeout

    if (
      typeof navigator !== 'undefined' &&
      /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/.test(navigator.userAgent)
    ) {
      pollingId = setInterval(() => {
        ping().then((isOnline) => setState({ isOnline }))
      }, 5000)
    }
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      if (pollingId) clearInterval(pollingId)
    }
  }, [])

  useEffect(() => {
    if (isOnline) return
    document.querySelector('.fb-plugin')?.remove()
  }, [isOnline])

  if (!isOnline)
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <img
            src="/thunder.svg"
            alt=""
            className="mx-auto h-40 w-40 select-none"
            draggable={false}
          />
          <div className="mt-10 mb-5 space-y-4 text-center text-4xl">
            <div>You are not connected to the internet.</div>
            <div>Please check your network.</div>
          </div>
        </div>
      </div>
    )
  return <>{children}</>
}

export default Offline
