// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
// Custom components
import BarChart from 'components/charts/BarChart'
import React from 'react'
import {
  barChartDataConsumption,
  barChartOptionsConsumption
} from 'variables/charts'
import { CalendarButton } from 'views/admin/dashboard/components/CalendarButton'
import CardwithModal from './CardwithModal'
import ModeSwitch from './ModeSwitch'

export default function WeeklyRevenue (props) {
  const { chartConfig, chartData, tableConfig, tableData, ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  return (
    <CardwithModal
      tableConfig={tableConfig}
      tableData={tableData}
      tableName='运营商分布详表'
      align='center'
      direction='column'
      w='100%'
      {...rest}
    >
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'
        >
          运营商分布
        </Text>
        <Flex direction='column'>
          <ModeSwitch isTraffic='false'></ModeSwitch>
          <CalendarButton />
        </Flex>
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        />
      </Box>
    </CardwithModal>
  )
}
