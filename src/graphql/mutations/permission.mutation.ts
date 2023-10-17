import { gql } from "__generated__";

export const CREATE_PERMISSION = gql(`
  mutation createPermission($input: PermissionInput) {
    createPermission(input: $input) {
      id
      name
      role {
        id
        name
      }
    }
  }
`)

export const UPDATE_PERMISSION = gql(`
  mutation updatePermission($id: ID!, $input: PermissionInput) {
    updatePermission(id: $id, input: $input) {
      id
      name
      role {
        id
        name
      }
    }
  }
`)

export const DELETE_PERMISSION = gql(`
  mutation deletePermission($id: ID!) {
    deletePermission(id: $id)
  }
`)