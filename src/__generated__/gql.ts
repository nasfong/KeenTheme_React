/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      createdAt\n      email\n      role {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      role\n      email\n    }\n}\n": types.GetUserDocument,
    "\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n": types.RecipesDocument,
    "\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n": types.GetRoleDropdownDocument,
};

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
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      createdAt\n      email\n      role {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: UserInput) {\n    createUser(input: $input) {\n      id\n      username\n      password\n      createdAt\n      email\n      role {\n        id\n        name\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($input: UserInput, $id: ID!) {\n    updateUser(input: $input, id: $id) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers($amount: Int) {\n    getAllUsers(amount: $amount) {\n      id\n      username\n      password\n      email\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      role\n      email\n    }\n}\n"): (typeof documents)["\n  query getUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      password\n      username\n      role\n      email\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n"): (typeof documents)["\n  query Recipes($amount: Int) {\n    recipes(amount: $amount) {\n      id\n      name\n      description\n      thumbsUp\n      thumbsDown\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n"): (typeof documents)["\n  query getRoleDropdown {\n    getRoleDropdown \n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;