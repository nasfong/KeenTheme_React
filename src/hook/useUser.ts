import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from 'graphql/querys/user.query'

interface Props {
  limit?: number
}
export function useUser({ limit }: Props) {
  return useQuery(GET_ALL_USERS, {
    variables: {
      limit: limit
    },
    fetchPolicy: 'network-only',
  })
}
