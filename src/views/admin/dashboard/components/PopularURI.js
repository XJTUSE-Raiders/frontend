import React from 'react'

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import BarChart from 'components/charts/BarChart'

// Custom components
import { CalendarMenu } from 'views/admin/dashboard/components/CalendarMenu'
import CardwithModal from './CardwithModal'
import ModeSwitch from './ModeSwitch'

export default function DailyTraffic (props) {
  const { tableConfig, tableData, chartOptions, chartData, ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  return (
    <CardwithModal
      align='center'
      direction='column'
      w='100%'
      tableConfig={tableConfig}
      tableData={tableData}
      tableName='最常访问 URI 详表'
      {...rest}
    >
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'
            >
              最常访问 URI
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
            >
              Trending
            </Text>
          </Flex>
        </Flex>
        <Flex direction='column'>
              <ModeSwitch isTraffic='false'></ModeSwitch>
              <CalendarMenu />
            </Flex>
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart chartData={chartData} chartOptions={chartOptions} />
      </Box>
    </CardwithModal>
  )
}
