import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import CommonModal from 'views/admin/dashboard/components/CommonModal'
import DetailTable from "views/admin/dashboard/components/DetailTable";
import {CalendarButton} from 'views/admin/dashboard/components/CalendarButton'

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import TheadwithNoBubble from "./TheadwithNoBubble";
import CardwithModal from "./CardwithModal";
export default function ColumnsTable(props) {
  const { chartConfig, chartData, tableConfig, tableData } = props;

  const columns = useMemo(() => chartConfig, [chartConfig]);
  const data = useMemo(() => chartData, [chartData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <CardwithModal
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }} 
      tableConfig={tableConfig}
      tableData={tableData}
      tableName='访问抵达性统计详表'>
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          访问抵达性统计
        </Text>
        <CalendarButton />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <TheadwithNoBubble>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </TheadwithNoBubble>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "状态码") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "可访问性") {
                    data = (
                      <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value === "正常"
                              ? "green.500"
                              : cell.value === "故障"
                              ? "red.500"
                              : cell.value === "未知"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "正常"
                              ? MdCheckCircle
                              : cell.value === "故障"
                              ? MdCancel
                              : cell.value === "未知"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "数量") {
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
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </CardwithModal>
  );
}
