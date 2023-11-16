import { gql } from '__generated__'

export const GET_RECIPE = gql(/* GraphQL */ `
  query Recipes($amount: Int) {
    recipes(amount: $amount) {
      id
      name
      description
      thumbsUp
      thumbsDown
    }
  }
`)
