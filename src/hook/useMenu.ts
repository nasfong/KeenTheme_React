import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  CREATE_MENU,
  CREATE_MENU_PARENT,
  DELETE_MENU,
  DELETE_MENU_PARENT,
  UPDATE_MENU,
  UPDATE_MENU_PARENT,
} from 'graphql/mutations/menu.mutation'
import { GET_ALL_MENUS, GET_ALL_MENU_PARENTS, GET_ALL_SIDE_MENUS } from 'graphql/querys/menu.query'

// Query
export const useQueryMenu = () => {
  return useQuery(GET_ALL_MENUS, { fetchPolicy: 'network-only' })
}
export const useQueryMenuParent = () => {
  return useLazyQuery(GET_ALL_MENU_PARENTS)
}

export const useQuerySideMenu = () => {
  return useQuery(GET_ALL_SIDE_MENUS)
}

// Mutation
export const useDeleteMenu = () => {
  return useMutation(DELETE_MENU)
}

export const useCreateMenu = () => {
  return useMutation(CREATE_MENU)
}

export const useUpdateMenu = () => {
  return useMutation(UPDATE_MENU)
}

export const useCreateMenuParent = () => {
  return useMutation(CREATE_MENU_PARENT)
}

export const useUpdateMenuParent = () => {
  return useMutation(UPDATE_MENU_PARENT)
}

export const useDeleteMenuParent = () => {
  return useMutation(DELETE_MENU_PARENT)
}
