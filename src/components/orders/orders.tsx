import { useQuery } from "@apollo/client"
import { Box, Text, Spinner, Flex, Tbody, Td, Tr } from "@chakra-ui/react"
import { TableComponent } from "../table/table"
import { getOrders } from "../../graphQL/queries/getOrders";

export const Orders = () => {
  const { data, loading } = useQuery(getOrders, {
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }
  })


  return <Box margin="0 auto">
    <Text textAlign="center" fontWeight="900" fontSize={["5xl", "5xl", "7xl"]}>List Of Recent Orders</Text>
    <Box marginTop="20">
      {loading ? <Flex justifyContent="center"><Spinner /></Flex> : <TableComponent pagination={false} thead={['Order Name', 'Order Date', 'Total', 'Collection Date', "Delivery Date"]}>
        <Tbody>
          {
            data?.orders?.map((val: any, ind: any) => <Tr key={ind}>
              <Td>{val?.orderName}</Td>
              <Td>{val?.orderDate? new Date(val?.orderDate).toDateString(): null }</Td>
              <Td>{val?.total}</Td>
              <Td>{val?.collectionDate ?new Date(val?.collectionDate).toDateString(): null }</Td>
              <Td>{val?.deliveryDate ?new Date(val?.deliveryDate).toDateString(): null }</Td>
            </Tr>)
          }
        </Tbody></TableComponent>}
    </Box>
  </Box>
}