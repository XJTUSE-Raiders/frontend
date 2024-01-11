import {
  // Avatar,
  Box,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  Spacer,
  Skeleton,
  useColorModeValue,
  useBoolean,
} from '@chakra-ui/react'
// import CardwithModal from './CardwithModal'
import React, { useMemo, useState } from 'react'
import Card from 'components/card/Card.js'
import TheadwithNoBubble from 'views/admin/dashboard/components/TheadwithNoBubble'
import {
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table'
import ModeSwitch from './ModeSwitch'
import { api } from 'variables/api'
import { useQuery } from '@tanstack/react-query'
import { CalendarMenu, timeStepToSeconds } from './CalendarMenu'

function fetchGeoTable(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/geo', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => {
    const { series, acc } = data;
    // [{ name: series, acc, percent: acc / sum * 100 }]
    const sum = acc.reduce((ax, cur) => ax + cur, 0);
    return series.map((name, idx) => ({
      name,
      acc: acc[idx],
      percent: acc[idx] * 100 / sum,
    }));
  })
}

export default function GeoTable(props) {

  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('month');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['GeoTable', isTraffic, timeStep],
    queryFn: () => fetchGeoTable(isTraffic, timeStep),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: (_data, { queryKey }) => timeStepToSeconds(queryKey[2]) * 1000,
  });

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  }

  const computedData = useMemo(() => data instanceof Array ? data : [], [data])

  const columns = useMemo(() => [
    {
      Header: "地域名称",
      accessor: "name",
    },
    {
      Header: isTraffic ? "流量 (bytes)" : "访问量",
      accessor: "acc",
    },
    {
      Header: "占比",
      accessor: "percent",
    },
  ], [isTraffic])

  const tableInstance = useTable(
    {
      columns,
      data: computedData,
    },
    useGlobalFilter,
    useSortBy
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const cardColor = useColorModeValue('white', 'navy.700')
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  return (
    <Card
      bg={cardColor}
      flexDirection='row'
      boxShadow={cardShadow}
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
          <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
            客户地域分布排行
          </Text>
          <Spacer />
          <Flex direction='column'>
            <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
            <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
          </Flex>
        </Flex>

        <Box overflowY='auto' maxHeight='200px'>
          {isLoading ? <Skeleton h="200px" /> : (<Table {...getTableProps()} variant='simple' color='gray.500'>
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
              {rows.map((row, index) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = ''
                      // console.log(cell)
                      if (cell.column.Header === '地域名称') {
                        data = (
                          <Flex align='center'>
                            <Text
                              color={textColor}
                              fontSize='sm'
                              fontWeight='600'
                            >
                              {cell.value}
                            </Text>
                          </Flex>
                        )
                      } else if (cell.column.Header === (isTraffic ? "流量 (bytes)" : "访问量")) {
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
          </Table>)}
        </Box>
      </Flex>
    </Card>
  )
}
