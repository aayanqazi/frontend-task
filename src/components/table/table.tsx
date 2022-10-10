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
  children: React.ReactNode, currentPage?: number, thead?: string[], totalCount?: number, onNextPage?: () => void, onPrevPage?: () => void, pagination?: boolean
}

export const TableComponent: FC<TableComponentProps> = ({ children, currentPage = 1, thead = [], totalCount = 0, onNextPage, onPrevPage, pagination = false }) => {
  return <TableContainer>
    <Table variant='striped' colorScheme='blue'>
      {pagination ? <TableCaption><Button onClick={onPrevPage} disabled={currentPage <= 1}>Previous</Button><Button>{currentPage}</Button><Button disabled={totalCount <= currentPage} onClick={onNextPage} >Next</Button></TableCaption> : null}
      <Thead>
        <Tr>
          {thead?.map((val) =>
            <Th key={val}>{val}</Th>
          )}
        </Tr>
      </Thead>
      {children}
    </Table>
  </TableContainer>
}