import { gql } from "@apollo/client";

export const getProductsQueryDocument = gql(`
query getProducts($limit: Int!, $index: Int!) {
   products(limit:$limit, index: $index){
         count
         products{
           itemType
            code
           id
           description1
           unit1
           weight
           price{
             price{
               price
             }
           }
         }
       }
       }
`)