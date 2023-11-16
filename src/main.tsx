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
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'routes/Routes'
// import './_metronic/assets/sass/plugins.scss'
import { setContext } from '@apollo/client/link/context'
import React from 'react'
import {
  // CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { theme } from 'config/theme'
import RoutesApp from 'routes/RoutesApp'
import { PermissionProvider } from 'routes/PermissionsContext'
import { Provider } from 'react-redux'
import { store } from 'helpers/store'

const queryClient = new QueryClient()
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})
const authLink = setContext((_, { headers }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hc0ZvbmdzZGRkIiwicGFzc3dvcmQiOiJpcm9uMDA3MTEiLCJpYXQiOjE2OTYzMjUxMDR9.5YFF4OrWQ8UUUwjwvU8xfz456ef444G_Viqecrmu6hE'
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // queryDeduplication: false
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <MasterInit>
            <I18nextProvider i18n={i18n}>
              <Provider store={store}>
                <PermissionProvider>
                  {/* App */}
                  <RouterProvider router={router} />
                  {/* <RoutesApp /> */}
                </PermissionProvider>
              </Provider>
            </I18nextProvider>
          </MasterInit>
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
