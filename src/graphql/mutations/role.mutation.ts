import { gql } from '__generated__'

export const DELETE_ROLE = gql(`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`)

export const CREATE_ROLE = gql(`
  mutation createRole($input: RoleInput) {
    createRole(input: $input) {
      id
      name
      permission {
        id
        name
      }
    }
  }
`)

export const UPDATE_ROLE = gql(`
  mutation updateRole($id: ID!, $input: RoleInput) {
    updateRole(id: $id, input: $input) {
      id
      name
      permission {
        id
        name
      }
    }
  }
`)
