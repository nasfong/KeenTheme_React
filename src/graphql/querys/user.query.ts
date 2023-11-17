import { gql } from '__generated__'

export const GET_ALL_USERS = gql(/* GraphQL */ `
  query getAllUsers($search: String, $page: Int, $limit: Int) {
    getAllUsers(search: $search, page: $page, limit: $limit) {
      users {
        id
        username
        password
        email
        role {
          id
          name
        }
      }
      totalPages
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
