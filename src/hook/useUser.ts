import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from 'graphql/querys/user.query'

export function useUser() {
  return useQuery(GET_ALL_USERS, {
    fetchPolicy: 'network-only',
  })
}
