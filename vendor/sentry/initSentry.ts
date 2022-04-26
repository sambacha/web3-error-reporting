import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

export const initSentry = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      // NEXT_PUBLIC_RELEASE_VERSION: Set in package.json when releasing
      release: process.env.NEXT_PUBLIC_RELEASE_VERSION,
      environment: process.env.NEXT_PUBLIC_SENTRY_ENV || 'staging',
      integrations: [
        new Integrations.BrowserTracing(),
        new Sentry.Integrations.Breadcrumbs({
          console: false
        })
      ]
    })
  }
}

export const sentryLog = (msg: string, walletName?: string): any => {
  Sentry.withScope(function (scope) {
    if (walletName) {
      scope.setTag('web3', walletName)
      scope.setContext('wallet', {
        name: walletName
      })
    }

    Sentry.captureMessage(msg)
  })
}
