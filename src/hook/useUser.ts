import { useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, DELETE_USER, UPDATE_USER } from 'graphql/mutations/user.mutation'
import { GET_ALL_USERS } from 'graphql/querys/user.query'
import { CreateUserMutation, UserInput } from 'src/__generated__/graphql'

interface Props {
  limit?: number
}
export function useUser({ limit }: Props) {
  return useQuery(GET_ALL_USERS, {
    variables: {
      limit: limit
    },
    // fetchPolicy: 'network-only',
  })
}

export function useDeleteUser() {
  return useMutation(DELETE_USER)
}

export function useCreateUser() {
  return useMutation<
    {
      [x: string]: any;
      createUser: CreateUserMutation['createUser']
    }
    , { input: UserInput }
  >(CREATE_USER)
}

export function useUpdateUser() {
  return useMutation<{
    [x: string]: any;
    updateUser: CreateUserMutation['createUser']
  }, { input: UserInput, id?: string }>(UPDATE_USER)
}