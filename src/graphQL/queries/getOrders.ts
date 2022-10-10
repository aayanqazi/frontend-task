import { gql } from "@apollo/client";

export const getOrders = gql(`
query getOrders {
    orders{
        orderNo
        orderName
        orderDate
        deliveryDate
        total
        paymentType
        notes
        status
        collectionDate
      }
}
`)