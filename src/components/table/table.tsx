import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import { FC } from 'react'

type TableComponentProps = {
  currentPage?: number, thead?: string[], tbody?: any[], totalCount: number, onNextPage: () => void, onPrevPage: () => void
}

export const TableComponent: FC<TableComponentProps> = ({ currentPage = 1, thead = [], tbody = [], totalCount = 0, onNextPage, onPrevPage }) => {
  return <TableContainer>
    <Table variant='striped' colorScheme='blue'>
      <TableCaption><Button onClick={onPrevPage} disabled={currentPage <= 1}>Previous</Button><Button>{currentPage}</Button><Button disabled={totalCount <= currentPage} onClick={onNextPage} >Next</Button></TableCaption>
      <Thead>
        <Tr>
          {thead?.map((val) =>
            <Th key={val}>{val}</Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {
          tbody?.map((val, ind) => <Tr key={ind}>
            <Td>{val?.code}</Td>
            <Td>{val?.itemType}</Td>
            <Td>{val?.description1}</Td>
            <Td>{val?.weight}</Td>
            <Td>{val?.price?.price?.price}</Td>
          </Tr>)
        }
      </Tbody>
    </Table>
  </TableContainer>
}