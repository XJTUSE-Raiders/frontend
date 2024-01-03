import React from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue, useDisclosure,} from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "variables/charts";
import {CalendarButton} from 'views/admin/dashboard/components/CalendarButton'
import  CommonModal from "views/admin/dashboard/components/CommonModal";
import URITable from "views/admin/dashboard/tables/URITable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";

export default function DailyTraffic(props) {
  const { ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest} onClick={onOpen}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              最常访问 URI
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Trending
            </Text>
            <CommonModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
              <URITable 
                columnsData={columnsDataColumns}
                tableData={tableDataColumns}
              />
            </CommonModal>
          </Flex>
          
        </Flex>
        <CalendarButton />
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  );
}
