import { gql } from "@/__generated__"

export const CREATE_MENU = gql(`
  mutation createMenu($input: MenuInput) {
    createMenu(input: $input) {
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

export const UPDATE_MENU = gql(`
  mutation updateMenu($id: ID!, $input: MenuInput) {
    updateMenu(id: $id, input: $input) {
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

export const CREATE_MENU_PARENT = gql(`
  mutation createMenuParent($input: MenuParentInput) {
    createMenuParent(input: $input) {
      id
      name
      order
    }
  }
`)

export const UPDATE_MENU_PARENT = gql(`
  mutation updateMenuParent($id: ID!, $input: MenuParentInput) {
    updateMenuParent(id: $id, input: $input) {
      id
      name
      order
    }
  }
`)

export const DELETE_MENU_PARENT = gql(`
  mutation deleteMenuParent($id: ID!) {
    deleteMenuParent(id: $id) 
  }
`)

export const DELETE_MENU = gql(`
  mutation deleteMenu($id: ID!) {
    deleteMenu(id: $id)
  }
`)
