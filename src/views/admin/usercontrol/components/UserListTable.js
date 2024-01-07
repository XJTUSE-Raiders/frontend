import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  IconButton,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import { MdOutlineRefresh } from "react-icons/md";
import React, { useMemo } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'

// Custom components
import Card from 'components/card/Card'
import UserModifyButton from './UserModifyButton';
import AssignRoleButton from './AssignRoleButton';
import DeleteButton from './DeleteButton';
export default function ColumnsTable (props) {
  const { columnsData, tableData } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState
  } = tableInstance
  initialState.pageSize = 5

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex my={1}>
        <UserModifyButton size='md' colorScheme='brand' modalName='增加新用户' mx={1}>
          增加用户
        </UserModifyButton>
        <AssignRoleButton size='md' colorScheme='brand' mx={1}>
          分配用户组
        </AssignRoleButton>
        <DeleteButton size='md' colorScheme='red' mx={1}>
          删除用户
        </DeleteButton>
        <IconButton colorScheme='brand' icon={<MdOutlineRefresh size='60%' />} mx={1} />
      </Flex>
      <Table
        {...getTableProps()}
        variant='simple'
        color='gray.500'
        mb='24px'
        // __css={{ 'table-layout': 'fixed', width: 'full' }}
      >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              <Th pe='10px' key={index} borderColor={borderColor}>
                <Flex
                  justify='space-between'
                  align='center'
                  fontSize={{ sm: '10px', lg: '12px' }}
                  color='gray.400'
                >
                  多选
                </Flex>
              </Th>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'
                  >
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
              <Th pe='10px' borderColor={borderColor} textAlign='center'>
                <Flex
                  justify='space-between'
                  // alignSelf='center'
                  fontSize={{ sm: '10px', lg: '12px' }}
                  color='gray.400'
                >
                  操作
                </Flex>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} key={index}>
                <Td>
                  <Checkbox></Checkbox>
                </Td>
                {row.cells.map((cell, index) => {
                  let data = ''
                  if (cell.column.Header === '名称') {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    )
                  } else if (cell.column.Header === '类型') {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'
                        >
                          {cell.value}%
                        </Text>
                      </Flex>
                    )
                  } else if (cell.column.Header === '创建时间') {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    )
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor='transparent'
                    >
                      {data}
                    </Td>
                  )
                })}
                <Td textAlign='start'>
                  <UserModifyButton colorScheme='brand' size='sm' modalName='修改用户信息'>
                    修改用户
                  </UserModifyButton>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Card>
  )
}
