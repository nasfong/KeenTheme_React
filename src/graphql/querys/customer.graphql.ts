import { gql } from "src/__generated__";

export const GET_ALL_CUSTOMERS = gql(`
  query GetAllCustomers {
    getAllCustomers {
      id
      userId
      name
      age
      phone
    }
  }
`)