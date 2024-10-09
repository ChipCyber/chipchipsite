import React from 'react'
import { ThemeContextProvider } from './ThemeContext'
import { LoadingContextProvider } from './context/loading'
import { Provider } from 'react-redux'
import store from './store'

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <LoadingContextProvider>
          {children}
        </LoadingContextProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
