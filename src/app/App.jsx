import React from 'react'
import { Provider } from 'react-redux'
import { Router, BrowserRouter } from 'react-router-dom'
import history from 'history.js'

import { GlobalCss, MatxTheme } from 'app/components'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import AppContext from './contexts/AppContext'
import Store from './redux-toolkit/store'
import routes from './RootRoutes'
import AppRouter from './AppRouter'
import '../fake-db'

import 'video-react/dist/video-react.css'


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <SettingsProvider>
          <MatxTheme>
            <GlobalCss />

            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Router history={history}>
                <AppRouter />
              </Router>
            </BrowserRouter>
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    </AppContext.Provider>
  )
}

export default App
