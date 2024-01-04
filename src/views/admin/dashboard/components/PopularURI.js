import React from 'react'

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import BarChart from 'components/charts/BarChart'

// Custom components
import Card from 'components/card/Card.js'
import { CalendarButton } from 'views/admin/dashboard/components/CalendarButton'
import CommonModal from 'views/admin/dashboard/components/CommonModal'
import DetailTable from 'views/admin/dashboard/components/DetailTable'
import CardwithModal from './CardwithModal'

export default function DailyTraffic (props) {
  const { tableConfig, tableData, chartOptions, chartData, ...rest } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        <CalendarButton />
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart chartData={chartData} chartOptions={chartOptions} />
      </Box>
    </CardwithModal>
  )
}
