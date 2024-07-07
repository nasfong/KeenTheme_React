import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/login";

export function useLogin() {
  return useMutation(LOGIN)
}