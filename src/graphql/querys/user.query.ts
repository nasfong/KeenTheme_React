import { gql } from '__generated__'

export const GET_ALL_USERS = gql(/* GraphQL */ `
  query getAllUsers($amount: Int) {
    getAllUsers(amount: $amount) {
      id
      username
      password
      email
      role {
        id
        name
      }
    }
  }
`)

export const GET_USER_BY_ID = gql(/* GraphQL */ `
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      password
      username
      email
      role {
        id
      }
    }
  }
`)
