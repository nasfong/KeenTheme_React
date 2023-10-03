import { useQuery } from '@apollo/client'
import { GET_RECIPE } from 'graphql/querys/recipe.query'

export function useRecipe(amount: number) {
  return useQuery(GET_RECIPE, {
    variables: { amount }
  })
}