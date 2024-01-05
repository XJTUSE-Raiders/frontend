// Chakra imports
import {
  Flex,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Text,
  Box,
  useColorModeValue,
  Button,
  Spacer
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import React from 'react'
import RoleBox from 'views/admin/usercontrol/components/RoleBox'
import PermBox from 'views/admin/usercontrol/components/PermBox'

// Assets
export default function GeneralInformation (props) {
  const { ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  const staticShadow = '0px 18px 40px rgba(112, 144, 176, 0.12)'
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Flex direction='row'>
        <Flex>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='20px'
          alignSelf='flex-start'
        >
          角色和权限管理
        </Text>
        </Flex>
        <Spacer />
        <Flex alignSelf='flex-end' my='auto' py='auto'>
          <Button >复位修改</Button>
          <Button variant='brand'>保存修改</Button>
        </Flex>
      </Flex>

      <Flex w='100%' overflowX='auto' direction='column' minH='80%'>
        {/* <SimpleGrid columns='1' gap='20px'> */}
        <Flex w='1400px'>
          <RoleBox title='User.Charts' value='用户查看图表的权限' />
        </Flex>
        <Flex w='1400px'>
          <PermBox
            boxShadow={staticShadow}
            check='false'
            title='User.Charts.ISP'
            value='查看 ISP 数据分布情况'
          />
        </Flex>
        {/* </SimpleGrid> */}
      </Flex>
    </Card>
  )
}
