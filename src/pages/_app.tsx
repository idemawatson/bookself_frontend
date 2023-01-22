import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { FC, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayout } from '@/components/layout/MainLayout'
import { ErrorFallback } from '@/components/uiParts/TheErrorBoundary'
import { TheLoading } from '@/components/uiParts/TheLoading'
import { TheNotificationToast } from '@/components/uiParts/TheNotificationToast'
import { Auth0Provider } from '@auth0/auth0-react'

type NextPageWithLayout = NextPage & {
  layout?: typeof MainLayout
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.layout || (({ children }: { children: ReactNode }) => <>{children}</>)

  return (
    <>
      <Auth0Provider
        domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN']!}
        clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID']!}
        authorizationParams={{
          redirect_uri: `${process.env['NEXT_PUBLIC_BASE_URL']}/books`,
          audience: process.env['NEXT_PUBLIC_AUTH0_IDENTIFIER'],
        }}
      >
        <CssBaseline>
          <Layout>
            <TheLoading />
            <TheNotificationToast />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </CssBaseline>
      </Auth0Provider>
    </>
  )
}

export default MyApp
