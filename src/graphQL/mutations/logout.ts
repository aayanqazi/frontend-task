import { gql } from "@apollo/client";

export const logoutMutationDocument = gql(`
mutation logoutMutation {
    logout
  }
`)