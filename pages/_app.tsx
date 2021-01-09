import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import '../styles/index.css'

/**
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
 */
const App = ({ Component, pageProps }: AppProps) => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache({
      /**
       * Why do we need typePolicies and the merge function? Read more about it
       * here:
       * @see https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
       * @see https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
       */
      typePolicies: {
        Query: {
          fields: {
            todos: {
              merge(existing, incoming) {
                return incoming
              },
            },
          },
        },
      },
    }),
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
