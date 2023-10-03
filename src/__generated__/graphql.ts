/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Object: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type File = {
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  createPermission?: Maybe<Permission>;
  createRecipe: Recipe;
  createRole?: Maybe<Role>;
  createUser?: Maybe<User>;
  deletePermission?: Maybe<Scalars['Boolean']['output']>;
  deleteRecipe?: Maybe<Scalars['Boolean']['output']>;
  deleteRole?: Maybe<Scalars['Boolean']['output']>;
  deleteUpload: File;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  singleUpload: File;
  updatePermission?: Maybe<Permission>;
  updateRecipe?: Maybe<Scalars['Boolean']['output']>;
  updateRole?: Maybe<Role>;
  updateUser: Users;
};


export type MutationCreatePermissionArgs = {
  input?: InputMaybe<PermissionInput>;
};


export type MutationCreateRecipeArgs = {
  input?: InputMaybe<RecipeInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<RoleInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRecipeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UserInput>;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<PermissionInput>;
};


export type MutationUpdateRecipeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<RecipeInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<RoleInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UserInput>;
};

export type Permission = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Array<Maybe<Role>>;
};

export type Query = {
  getAllPermissions?: Maybe<Array<Maybe<Permission>>>;
  getAllRoles: Array<Role>;
  getAllUsers: Array<Users>;
  getPermission?: Maybe<Permission>;
  getRole?: Maybe<Role>;
  getRoleDropdown?: Maybe<Scalars['Object']['output']>;
  getUser: Userss;
  recipe: Recipe;
  recipes: Array<Recipe>;
  uploads?: Maybe<Array<Maybe<File>>>;
};


export type QueryGetAllPermissionsArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllRolesArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllUsersArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRecipeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryRecipesArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};

export type Recipe = {
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  thumbsDown: Scalars['Int']['output'];
  thumbsUp: Scalars['Int']['output'];
};

export type RecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Role = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permission: Array<Maybe<Permission>>;
  user: Array<Maybe<User>>;
};

export type User = {
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  role?: Maybe<Array<Maybe<Role>>>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  username: Scalars['String']['input'];
};

export type Users = {
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  permission?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  role?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  username: Scalars['String']['output'];
};

export type Userss = {
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  role?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  username: Scalars['String']['output'];
};

export type PermissionInput = {
  name: Scalars['String']['input'];
  role?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type RoleInput = {
  name: Scalars['String']['input'];
  permission?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  user?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type CreateUserMutation = { createUser?: { id: string, username: string, password: string, createdAt?: string | null, email?: string | null, role?: Array<{ id: string, name: string } | null> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
  id: Scalars['ID']['input'];
}>;


export type UpdateUserMutation = { updateUser: { id: string, username: string, password: string, email?: string | null, role?: Array<string | null> | null, createdAt?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { deleteUser?: boolean | null };

export type GetAllUsersQueryVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllUsersQuery = { getAllUsers: Array<{ id: string, username: string, password: string, email?: string | null, role?: Array<string | null> | null, createdAt?: string | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { getUser: { id: string, password: string, username: string, role?: Array<string | null> | null, email?: string | null } };

export type RecipesQueryVariables = Exact<{
  amount?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RecipesQuery = { recipes: Array<{ id: string, name: string, description?: string | null, thumbsUp: number, thumbsDown: number }> };

export type GetRoleDropdownQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoleDropdownQuery = { getRoleDropdown?: any | null };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbsUp"}},{"kind":"Field","name":{"kind":"Name","value":"thumbsDown"}}]}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;
export const GetRoleDropdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRoleDropdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoleDropdown"}}]}}]} as unknown as DocumentNode<GetRoleDropdownQuery, GetRoleDropdownQueryVariables>;