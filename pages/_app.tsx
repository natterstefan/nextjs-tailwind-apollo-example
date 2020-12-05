import React from 'react'
import { AppProps } from 'next/app'

import { TodoProvider } from '../components/todo'

import '../styles/index.css'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  )
}

export default App
