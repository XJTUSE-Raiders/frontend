import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useColorModeValue,
  useBoolean,
  Spacer,
  Skeleton,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'
import { useQuery } from '@tanstack/react-query'

// Custom components
import { CalendarMenu, timeStepToSeconds } from './CalendarMenu'

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from 'react-icons/md'
import TheadwithNoBubble from './TheadwithNoBubble'
// import CardwithModal from './CardwithModal'
import Card from 'components/card/Card.js'
import ModeSwitch from './ModeSwitch'
import { api } from 'variables/api'


function fetchRespCode(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/status-code', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => {
    const { series, acc } = data;
    // [{ name: series, acc, percent: acc / sum * 100 }]
    const sum = acc.reduce((ax, cur) => ax + cur, 0);
    return series.sort((a, b) => a - b).map((code, idx) => ({
      name: code.toString(),
      status: (code >= 200 && code < 300) ? '正常' : (code >= 400 && code < 500) ? '客户端异常' : (code >= 500 && code < 600) ? '服务端异常' : '未知',
      percent: acc[idx] * 100 / sum,
    }));
  })
}

export default function ResponseCode(props) {
  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('month');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['RespCode', isTraffic, timeStep],
    queryFn: () => fetchRespCode(isTraffic, timeStep),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: (_data, { queryKey }) => timeStepToSeconds(queryKey[2]) * 1000,
  });

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  }

  const columns = useMemo(() => [
    {
      Header: "状态码",
      accessor: "name",
    },
    {
      Header: "可访问性",
      accessor: "status",
    },
    {
      Header: isTraffic ? "传输量" : "数量",
      accessor: "percent",
    },
  ], [isTraffic])

  const computedData = useMemo(() => data instanceof Array ? data : [], [data])

  const tableInstance = useTable(
    {
      columns,
      data: computedData,
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
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColor}
          fontSize='23px'
          fontWeight='700'
          lineHeight='100%'
        >
          访问抵达性统计
        </Text>
        <Spacer />
        <Flex direction='column'>
          <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
          <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
        </Flex>
      </Flex>
      {isLoading ? <Skeleton h="100%" /> : (
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <TheadwithNoBubble>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
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
                    if (cell.column.Header === '状态码') {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      )
                    } else if (cell.column.Header === '可访问性') {
                      data = (
                        <Flex align='center'>
                          <Icon
                            w='24px'
                            h='24px'
                            me='5px'
                            color={
                              cell.value === '正常'
                                ? 'green.500'
                                : cell.value === '服务端异常'
                                ? 'red.500'
                                : cell.value === '客户端异常'
                                ? 'orange.500'
                                : null
                            }
                            as={
                              cell.value === '正常'
                                ? MdCheckCircle
                                : cell.value === '服务端异常'
                                ? MdCancel
                                : cell.value === '客户端异常'
                                ? MdOutlineError
                                : null
                            }
                          />
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      )
                    } else if (cell.column.Header === (isTraffic ? "传输量" : "数量")) {
                      data = (
                        <Flex align='center'>
                          <Progress
                            variant='table'
                            colorScheme='brandScheme'
                            h='8px'
                            w='108px'
                            value={cell.value}
                          />
                        </Flex>
                      )
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: '14px' }}
                        maxH='30px !important'
                        py='8px'
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
      )}
    </Card>
  )
}
