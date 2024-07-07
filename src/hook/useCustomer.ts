import { useQuery } from "@apollo/client";
import { GET_ALL_CUSTOMERS } from "src/graphql/querys/customer.graphql";

export function useQueryCustomer() {
  return useQuery(GET_ALL_CUSTOMERS)
}