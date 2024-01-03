// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
// Custom components
import Card from 'components/card/Card.js'
import LineChart from 'components/charts/LineChart'
import {React, useState} from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlineCalendarToday } from 'react-icons/md'
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent
} from 'variables/charts'
import {CalendarButton} from 'views/admin/dashboard/components/CalendarButton'

export default function TotalSpent (props) {
  const { ...rest } = props

  const [menu, setMenu] = useState("This Month");


  // Chakra Color Mode

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  )
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
          <CalendarButton />

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
            访问量趋势<br /><br />客户端占比
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
