import { gql } from "__generated__";

export const GET_ALL_MENUS = gql(`
  query getAllMenus {
    getAllMenus {
      id
      name
      parent
      url
      icon
      color
      order
      status
    }
  }
`)

export const GET_ALL_MENU_PARENTS = gql(`
  query getAllMenuParents {
    getAllMenuParents {
      id
      name
    }
  }
`)

export const GET_ALL_SIDE_MENUS = gql(`
  query getAllSideMenus {
    getAllSideMenus
  }
`)