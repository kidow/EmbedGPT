import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { ErrorBoundary, Offline, Toast } from 'containers'
import { useEffect, useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { Session } from '@supabase/auth-helpers-react'
import 'styles/globals.css'
import { appWithTranslation } from 'next-i18next'

interface Props {
  initialSession: Session
}
interface State {}

export default appWithTranslation(function App({
  Component,
  pageProps
}: AppProps<Props>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    script.defer = true
    document.head.appendChild(script)
    script.onload = () => {
      window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_API)
    }

    return () => {
      script.remove()
    }
  }, [])
  return (
    <Offline>
      <ErrorBoundary>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
        </SessionContextProvider>
        <Toast />
      </ErrorBoundary>
    </Offline>
  )
})
