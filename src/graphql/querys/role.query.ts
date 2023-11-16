import { gql } from '__generated__'

export const GET_ROLE_DROPDOWN = gql(`
  query getRoleDropdown {
    getRoleDropdown 
  }
`)

export const GET_ALL_ROLES = gql(`
  query getAllRoles {
    getAllRoles {
      id
      name
      permission {
        id
        name
      }
    }
  }
`)
