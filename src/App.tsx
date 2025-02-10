import * as React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { defaultRoutePath, PrivateRoute, rootRoutes, ReactRouterRoute } from 'src/routes'

import { theme } from './themes'

function App() {
  function renderRoutes(props: ReactRouterRoute) {
    if (props.private) {
      return <PrivateRoute {...props} key={props.path} />
    }
    return <Route {...props} key={props.path} />
  }

  return (
    <ChakraProvider theme={theme}>
      <Switch>
        {rootRoutes.map(renderRoutes)}
        <Redirect to={defaultRoutePath} />
      </Switch>
    </ChakraProvider>
  )
}

export default App
