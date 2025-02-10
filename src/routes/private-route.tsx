import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Auth } from 'src/components'
import { useAuth } from 'src/Context'
import useCan from 'src/hooks/Can'

import { ReactRouterRoute } from '.'

const RoutesPrivate = ({ component: Component, path, ...rest }: ReactRouterRoute) => {
  const { signed, isLoadedStoredData } = useAuth()
  const [state, setState] = useState('loading')
  const [isAuthenticated, setIsisAuthenticated] = useState<boolean | null>(null)
  const hasPermission = useCan({ screen: path })

  useEffect(() => {
    setState('loading')
    try {
      ;(async function () {
        const isAuthorization = await hasPermission
        setIsisAuthenticated(isAuthorization)

        if (isLoadedStoredData) {
          if (signed && isAuthorization) {
            setState('authorized')
          } else if (!signed) {
            setState('noAuthorized')
          } else {
            setState('noAuthorized')
          }
        }
      })()
    } catch {
      setState('Redirect')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed, isLoadedStoredData])

  if (state === 'loading') {
    return <Auth isAuthenticated={isAuthenticated} loading={state} />
  }

  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        state === 'authorized' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default RoutesPrivate
