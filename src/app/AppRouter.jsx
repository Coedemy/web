import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from 'react-query'

import { MatxSuspense, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'

const queryClient = (historyHook) => (new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(`Something went wrong: ${error.message}`)
      historyHook.push('/500')
    }
  }),
}))

const AppRouter = () => {
  const historyHook = useHistory()
  return (
    < MatxSuspense >
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient(historyHook)}>
        <Switch>
          {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
          {sessionRoutes.map((item, i) => (
            <Route
              key={i}
              path={item.path}
              component={item.component}
            />
          ))}
          {/* AUTH PROTECTED DASHBOARD PAGES */}
          <AuthGuard>
            <MatxLayout />{' '}
            {/* RETURNS <Layout1/> component */}
          </AuthGuard>
        </Switch>
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </MatxSuspense >
  )
}

export default AppRouter
