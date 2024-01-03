// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import PieChart from 'components/charts/PieChart'
import { pieChartData, pieChartOptions } from 'variables/charts'
import { React, useState } from 'react'
import { MdOutlineCalendarToday, MdArrowDropDown } from 'react-icons/md'
import {CalendarButton} from 'views/admin/dashboard/components/CalendarButton'

export default function Conversion (props) {
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const cardColor = useColorModeValue('white', 'navy.700')
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  const [menu, setMenu] = useState('This Month')
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'
      >
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          客户操作系统分布
        </Text>
        <CalendarButton />
      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'
      >
        <Flex direction='column' align='center' w='100%'>
          <Flex>
            <Flex direction='column' me='5px'>
              <Flex align='center'>
                <Box
                  h='8px'
                  w='8px'
                  bg='brand.500'
                  borderRadius='50%'
                  me='4px'
                />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'
                >
                  Windows
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                25%
              </Text>
            </Flex>
            <Flex direction='column' me='5px'>
              <Flex align='center'>
                <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'
                >
                  macOS
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                20%
              </Text>
            </Flex>
            <Flex direction='column' me='5px'>
              <Flex align='center'>
                <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'
                >
                  Linux
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                10%
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex direction='column'>
              <Flex align='center' px='5px'>
                <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'
                >
                  Android
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                5%
              </Text>
            </Flex>
            <Flex direction='column'>
              <Flex align='center'>
                <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'
                >
                  iOS
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                5%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Card>
  )
}
