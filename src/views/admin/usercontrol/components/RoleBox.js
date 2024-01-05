// Chakra imports
import {
  Grid,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Badge,
  Code
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import React from 'react'

export default function Information (props) {
  const { title, value, ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('white', 'white')
  const textColorSecondary = 'gray.200'
  return (
    
    <Card bg='brand.500'  {...rest}>
      <Grid templateColumns='7fr 1fr 1fr 1fr 1fr 1fr'>
        <Flex>
          <Text
            color={textColorPrimary}
            fontWeight='550'
            fontSize='md'
            mx='3px'
            my='auto'
          >
            <Code colorScheme='whiteAlpha'>{title}</Code>
          </Text>
          <Text
            fontWeight='550'
            color={textColorSecondary}
            fontSize='md'
            mx='3px'
            my='auto'
          >
            {value}
          </Text>
        </Flex>
      
        <Badge colorScheme='red' variant='solid' textAlign='center' mx='auto' w='80%'>
          根用户
        </Badge>
        <Badge colorScheme='yellow' whiteSpace='normal' textAlign='center' mx='auto' w='80%'>
          前台管理
        </Badge>
        <Badge colorScheme='green' whiteSpace='normal' textAlign='center' mx='auto' w='80%'>
          后台管理
        </Badge>
        <Badge colorScheme='blue' textAlign='center' mx='auto' w='80%'>
          用户
        </Badge>
        <Badge colorScheme='whiteAlpha' textAlign='center' mx='auto' w='80%'>
          访客
        </Badge>
      </Grid>
    </Card>
  )
}
