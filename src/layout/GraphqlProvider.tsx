import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";
import { store } from "../context/authentication/store";
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})
const authLink = setContext((s, { headers }) => {
  console.log(s)
  const token = store.getState().auth?.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  // queryDeduplication: false
})
export const GraphqlProvider = ({ children }: { children: ReactNode }) => {

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
