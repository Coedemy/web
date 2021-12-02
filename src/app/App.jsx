import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
// import { Store } from './redux/Store'
import Store from './redux-toolkit/store'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import 'video-react/dist/video-react.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <SettingsProvider>
          <MatxTheme>
            <GlobalCss />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Router history={history}>
                {/* <AuthProvider> */}
                <MatxSuspense>
                  <QueryClientProvider client={queryClient}>
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
                  </QueryClientProvider>
                </MatxSuspense>
                {/* </AuthProvider> */}
              </Router>
            </BrowserRouter>
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    </AppContext.Provider>
  )
}

export default App
