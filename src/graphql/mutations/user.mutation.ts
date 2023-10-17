import { gql } from "__generated__";

// import { gql } from "@apollo/client";

export const CREATE_USER = gql(`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
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

export const UPDATE_USER = gql(`
  mutation UpdateUser($input: UserInput, $id: ID!) {
    updateUser(input: $input, id: $id) {
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

export const DELETE_USER = gql(`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`)