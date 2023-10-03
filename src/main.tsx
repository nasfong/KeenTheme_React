import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//? React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//? Theme Animation
import { MasterInit } from './_metronic/layout/MasterInit'
//? Translations
import { I18nextProvider } from 'react-i18next';
import i18n from './_metronic/i18n/i18n';

//? Theme style (Bootstrap + Scss)
import './_metronic/assets/sass/style.scss'
// import './_metronic/assets/sass/style.dark.scss'
import './_metronic/assets/sass/style.react.scss'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'routes/routes'
// import './_metronic/assets/sass/plugins.scss'

const queryClient = new QueryClient()

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  })
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <MasterInit>
          <I18nextProvider i18n={i18n} >
            <RouterProvider router={router} />
            {/* <App /> */}
          </I18nextProvider>
        </MasterInit>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApolloProvider>
  // </React.StrictMode>,
)
