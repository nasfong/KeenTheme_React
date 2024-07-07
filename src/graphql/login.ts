import { gql } from "@/__generated__";

export const LOGIN = gql(`
  mutation login($input: Login) {
    login(input: $input) {
      token
      message
    }
  }
`)