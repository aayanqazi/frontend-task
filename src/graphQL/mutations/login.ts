import { gql } from "@apollo/client";

export const loginMutationDocument = gql(`
mutation loginMutation($email: String!, $password: String!) {
    token : login(email: $email, password: $password)
  }
`)