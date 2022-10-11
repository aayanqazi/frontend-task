import { gql } from "@apollo/client";

export const getUserDetailQueryDocument = gql(`
query getUserDetail {
   user{
         name
         email
         contact
         city
         address1
         country
       }
      }
`);
