import { useQuery } from "@apollo/client"
import { Box, Text, Spinner, Flex, Tbody, Tr, Td } from "@chakra-ui/react"
import { getProductsQueryDocument } from "../../graphQL/queries/getProducts"
import { TableComponent } from "../table/table"
import { useSearchParams, useNavigate } from 'react-router-dom';

export const Products = () => {
  const [seachParams] = useSearchParams();
  const navigate = useNavigate()
  const currentPage = Number(seachParams.get("page") ?? 1) as number;
  const limit = currentPage * 30
  const { data, loading } = useQuery(getProductsQueryDocument, {
    variables: {
      limit,
      index: limit - 30
    }
  })

  const totalPages = loading ? 1 : Math.ceil(data?.products?.count / 30);

  return <Box margin="0 auto">
    <Text textAlign="center" fontWeight="900" fontSize="7xl">List Of Products</Text>
    <Box marginTop="20">
      {loading ? <Flex justifyContent="center"><Spinner /></Flex> : <TableComponent pagination={true} currentPage={currentPage} onPrevPage={() => {
        navigate({
          pathname: '/',
          search: `?page=${currentPage - 1}`,
        })
      }} onNextPage={() => {
        navigate({
          pathname: '/',
          search: `?page=${currentPage + 1}`,
        })
      }} totalCount={totalPages} thead={['Code', 'Type', 'Description', 'Weight', 'Price']}> <Tbody>
          {
            data?.products?.products?.map((val: any, ind: any) => <Tr key={ind}>
              <Td>{val?.code}</Td>
              <Td>{val?.itemType}</Td>
              <Td>{val?.description1}</Td>
              <Td>{val?.weight}</Td>
              <Td>{val?.price?.price?.price}</Td>
            </Tr>)
          }</Tbody></TableComponent>}
    </Box>
  </Box>
}