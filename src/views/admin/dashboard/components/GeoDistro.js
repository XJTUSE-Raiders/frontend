import {
  Avatar,
  Box,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import CardwithModal from './CardwithModal'
import React, { useMemo, useState } from 'react'
import TheadwithNoBubble from 'views/admin/dashboard/components/TheadwithNoBubble'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import { CalendarButton } from 'views/admin/dashboard/components/CalendarButton'
import ModeSwitch from './ModeSwitch'

function TopCreatorTable (props) {
  const { chartConfig, chartData, tableConfig, tableData } = props

  const columns = useMemo(() => chartConfig, [chartConfig])
  const data = useMemo(() => chartData, [chartData])
  const [isTraffic, setIsTraffic] = useState(false)

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance

  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const cardColor = useColorModeValue('white', 'navy.700')
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  return (
    <>
      <CardwithModal
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        tableConfig={tableConfig}
        tableData={tableData}
        tableName='地理分布详表'
      >
        <Flex
          direction='column'
          w='100%'
          overflowX={{ sm: 'scroll', lg: 'hidden' }}
        >
          <Flex
            align={{ sm: 'flex-start', lg: 'center' }}
            justify='space-between'
            w='100%'
            px='22px'
            pb='20px'
            mb='10px'
            boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'
          >
            <Text color={textColor} fontSize='xl' fontWeight='600'>
              客户地域分布排行
            </Text>
            <Flex direction='column'>
              <ModeSwitch isTraffic={isTraffic} onClick={(x) => setIsTraffic(!x)}></ModeSwitch>
              <CalendarButton />
            </Flex>
          </Flex>

          <Box overflowY='auto' maxHeight='430px'>
            <Table {...getTableProps()} variant='simple' color='gray.500'>
              <TheadwithNoBubble>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        pe='10px'
                        key={index}
                        borderColor='transparent'
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
                  </Tr>
                ))}
              </TheadwithNoBubble>

              <Tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => {
                        let data = ''
                        // console.log(cell)
                        if (cell.column.Header === '地域名称') {
                          data = (
                            <Flex align='center'>
                              <Avatar
                                src={cell.value[1]}
                                w='30px'
                                h='30px'
                                me='8px'
                              />
                              <Text
                                color={textColor}
                                fontSize='sm'
                                fontWeight='600'
                              >
                                {cell.value[0]}
                              </Text>
                            </Flex>
                          )
                        } else if (cell.column.Header === '访问量') {
                          data = (
                            <Text
                              color={textColorSecondary}
                              fontSize='sm'
                              fontWeight='500'
                            >
                              {cell.value}
                            </Text>
                          )
                        } else if (cell.column.Header === '占比') {
                          data = (
                            <Box>
                              <Progress
                                variant='table'
                                colorScheme='brandScheme'
                                value={cell.value}
                              />
                            </Box>
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
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </CardwithModal>
    </>
  )
}

export default TopCreatorTable
