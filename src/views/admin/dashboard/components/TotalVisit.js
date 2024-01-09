// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import LineChart from 'components/charts/LineChart'
import { React } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent
} from 'variables/charts'
import { CalendarButton } from 'views/admin/dashboard/components/CalendarButton'
import ModeSwitch from './ModeSwitch'

export default function TotalSpent (props) {
  const { ...rest } = props

  // Chakra Color Mode

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}
    >
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='right' w='100%'>
          <Flex direction='column'>
            <ModeSwitch isTraffic='false'></ModeSwitch>
            <CalendarButton />
          </Flex>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='23px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'
          >
            访问量趋势
            <br />
            <br />
            客户端占比
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'
            >
              Visit on trend
            </Text>
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex>
        </Flex>

        <Box minH='260px' minW='75%' mt='auto'>
          <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Box>
      </Flex>
    </Card>
  )
}
