/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation createMenu($input: MenuInput) {\n    createMenu(input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n':
    types.CreateMenuDocument,
  '\n  mutation updateMenu($id: ID!, $input: MenuInput) {\n    updateMenu(id: $id, input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n':
    types.UpdateMenuDocument,
  '\n  mutation createMenuParent($input: MenuParentInput) {\n    createMenuParent(input: $input) {\n      id\n      name\n      order\n    }\n  }\n':
    types.CreateMenuParentDocument,
  '\n  mutation updateMenuParent($id: ID!, $input: MenuParentInput) {\n    updateMenuParent(id: $id, input: $input) {\n      id\n      name\n      order\n    }\n  }\n':
    types.UpdateMenuParentDocument,
  '\n  mutation deleteMenuParent($id: ID!) {\n    deleteMenuParent(id: $id) \n  }\n':
    types.DeleteMenuParentDocument,
  '\n  mutation deleteMenu($id: ID!) {\n    deleteMenu(id: $id)\n  }\n':
    types.DeleteMenuDocument,
  '\n  mutation createPermission($input: PermissionInput) {\n    createPermission(input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.CreatePermissionDocument,
  '\n  mutation updatePermission($id: ID!, $input: PermissionInput) {\n    updatePermission(id: $id, input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.UpdatePermissionDocument,
  '\n  mutation deletePermission($id: ID!) {\n    deletePermission(id: $id)\n  }\n':
    types.DeletePermissionDocument,
  '\n  mutation deleteRole($id: ID!) {\n    deleteRole(id: $id)\n  }\n':
    types.DeleteRoleDocument,
  '\n  mutation createRole($input: RoleInput) {\n    createRole(input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n':
    types.CreateRoleDocument,
  '\n  mutation updateRole($id: ID!, $input: RoleInput) {\n    updateRole(id: $id, input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n':
    types.UpdateRoleDocument,
  '\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.UpdateUserDocument,
  '\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n':
    types.DeleteUserDocument,
  '\n  query getAllMenus {\n    getAllMenus {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n':
    types.GetAllMenusDocument,
  '\n  query getAllMenuParents {\n    getAllMenuParents {\n      id\n      name\n      order\n    }\n  }\n':
    types.GetAllMenuParentsDocument,
  '\n  query getAllSideMenus {\n    getAllSideMenus\n  }\n':
    types.GetAllSideMenusDocument,
  '\n  query getPermissionDropdown {\n    getPermissionDropdown \n  }\n':
    types.GetPermissionDropdownDocument,
  '\n  query getAllPermissions {\n    getAllPermissions {\n      id\n      name\n      role {\n        id \n        name\n      }\n    }\n  }\n':
    types.GetAllPermissionsDocument,
  '\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n':
    types.RecipesDocument,
  '\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n':
    types.GetRoleDropdownDocument,
  '\n  query getAllRoles {\n    getAllRoles {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetAllRolesDocument,
  '\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetAllUsersDocument,
  '\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      email\n      role {\n        id\n      }\n    }\n}\n':
    types.GetUserDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createMenu($input: MenuInput) {\n    createMenu(input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation createMenu($input: MenuInput) {\n    createMenu(input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updateMenu($id: ID!, $input: MenuInput) {\n    updateMenu(id: $id, input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation updateMenu($id: ID!, $input: MenuInput) {\n    updateMenu(id: $id, input: $input) {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createMenuParent($input: MenuParentInput) {\n    createMenuParent(input: $input) {\n      id\n      name\n      order\n    }\n  }\n',
): (typeof documents)['\n  mutation createMenuParent($input: MenuParentInput) {\n    createMenuParent(input: $input) {\n      id\n      name\n      order\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updateMenuParent($id: ID!, $input: MenuParentInput) {\n    updateMenuParent(id: $id, input: $input) {\n      id\n      name\n      order\n    }\n  }\n',
): (typeof documents)['\n  mutation updateMenuParent($id: ID!, $input: MenuParentInput) {\n    updateMenuParent(id: $id, input: $input) {\n      id\n      name\n      order\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteMenuParent($id: ID!) {\n    deleteMenuParent(id: $id) \n  }\n',
): (typeof documents)['\n  mutation deleteMenuParent($id: ID!) {\n    deleteMenuParent(id: $id) \n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteMenu($id: ID!) {\n    deleteMenu(id: $id)\n  }\n',
): (typeof documents)['\n  mutation deleteMenu($id: ID!) {\n    deleteMenu(id: $id)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createPermission($input: PermissionInput) {\n    createPermission(input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation createPermission($input: PermissionInput) {\n    createPermission(input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updatePermission($id: ID!, $input: PermissionInput) {\n    updatePermission(id: $id, input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation updatePermission($id: ID!, $input: PermissionInput) {\n    updatePermission(id: $id, input: $input) {\n      id\n      name\n      role {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deletePermission($id: ID!) {\n    deletePermission(id: $id)\n  }\n',
): (typeof documents)['\n  mutation deletePermission($id: ID!) {\n    deletePermission(id: $id)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteRole($id: ID!) {\n    deleteRole(id: $id)\n  }\n',
): (typeof documents)['\n  mutation deleteRole($id: ID!) {\n    deleteRole(id: $id)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createRole($input: RoleInput) {\n    createRole(input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation createRole($input: RoleInput) {\n    createRole(input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updateRole($id: ID!, $input: RoleInput) {\n    updateRole(id: $id, input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation updateRole($id: ID!, $input: RoleInput) {\n    updateRole(id: $id, input: $input) {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n',
): (typeof documents)['\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllMenus {\n    getAllMenus {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n',
): (typeof documents)['\n  query getAllMenus {\n    getAllMenus {\n      id\n      name\n      parent\n      url\n      icon\n      color\n      order\n      status\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllMenuParents {\n    getAllMenuParents {\n      id\n      name\n      order\n    }\n  }\n',
): (typeof documents)['\n  query getAllMenuParents {\n    getAllMenuParents {\n      id\n      name\n      order\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllSideMenus {\n    getAllSideMenus\n  }\n',
): (typeof documents)['\n  query getAllSideMenus {\n    getAllSideMenus\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getPermissionDropdown {\n    getPermissionDropdown \n  }\n',
): (typeof documents)['\n  query getPermissionDropdown {\n    getPermissionDropdown \n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllPermissions {\n    getAllPermissions {\n      id\n      name\n      role {\n        id \n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getAllPermissions {\n    getAllPermissions {\n      id\n      name\n      role {\n        id \n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n',
): (typeof documents)['\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n',
): (typeof documents)['\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllRoles {\n    getAllRoles {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getAllRoles {\n    getAllRoles {\n      id\n      name\n      permission {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role {\n        id\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      email\n      role {\n        id\n      }\n    }\n}\n',
): (typeof documents)['\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      email\n      role {\n        id\n      }\n    }\n}\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
