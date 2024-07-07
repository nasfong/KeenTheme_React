import ReactDOM from 'react-dom/client'

//? React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//? Theme Animation
import { MasterInit } from './_metronic/layout/MasterInit'
//? Translations
import { I18nextProvider } from 'react-i18next'
import i18n from './_metronic/i18n/i18n'

//? Theme style (Bootstrap + Scss)
import './_metronic/assets/sass/style.scss'
// import './_metronic/assets/sass/style.dark.scss'
import './_metronic/assets/sass/style.react.scss'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
// import { RouterProvider } from 'react-router-dom'
// import { router } from 'routes/Routes'
// import './_metronic/assets/sass/plugins.scss'
import { setContext } from '@apollo/client/link/context'
import React, { Suspense } from 'react'
import {
  // CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { Provider } from 'react-redux'
import { persistor, store, useAuthSelector } from './context/authentication/store'
import { PersistGate } from 'redux-persist/integration/react'
import { GraphqlProvider } from './layout/GraphqlProvider'
import { theme } from '@/config/theme'
import RoutesApp from '@/routes/RoutesApp'

const queryClient = new QueryClient() // Tanstack


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})
// const authLink = setContext((_, { headers }) => {
//   const token = store.getState().auth?.token

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     }
//   }
// })

const authLink = setContext(async (_, { headers }) => {
  // Your logic to check if the token is expired and refresh it
  const { state } = useAuthSelector(state => state.auth);

  if (state?.token) {
    // Call your refresh token function
    // Get the new token after refresh
    const newToken = state.token; // Update this based on how you manage your refreshed token

    // Return the headers with the new token
    return {
      headers: {
        ...headers,
        authorization: newToken ? `Bearer ${newToken}` : '',
      },
    };
  }

  // If the token is not expired, use the existing headers
  return { headers };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // queryDeduplication: false
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Persist Loading...</div>}>
        {/* <ApolloProvider client={client}> */}
        <GraphqlProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              {/* <CssBaseline /> */}
              <MasterInit>
                <I18nextProvider i18n={i18n}>
                  {/* App */}
                  <Suspense fallback={<>Loading......................</>}>
                    {/* <RouterProvider router={router} /> */}
                    <RoutesApp />
                  </Suspense>
                </I18nextProvider>
              </MasterInit>
              <ReactQueryDevtools />
            </ThemeProvider>
          </QueryClientProvider>
        </GraphqlProvider>
        {/* </ApolloProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
