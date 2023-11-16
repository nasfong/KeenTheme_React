import { gql } from '__generated__'

export const GET_PERMISSION_DROPDOWN = gql(`
  query getPermissionDropdown {
    getPermissionDropdown 
  }
`)

export const GET_ALL_PERMISSIONS = gql(`
  query getAllPermissions {
    getAllPermissions {
      id
      name
      role {
        id 
        name
      }
    }
  }
`)
