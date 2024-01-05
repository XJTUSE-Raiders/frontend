// Chakra imports
import {
  Grid,
  Checkbox,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Code
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import React from 'react'

export default function Information (props) {
  const { check, title, value, ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const bg = useColorModeValue('white', 'navy.700')
  return (
    <Card bg={bg} {...rest}>
      <Grid templateColumns='1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr' >
      <Text
            color={textColorPrimary}
            fontWeight='550'
            fontSize='md'
            mx='3px'
            my='auto'
          >
            <Code>{title}</Code>
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
        <Flex />
        <Checkbox defaultChecked={check} mx='auto' />
        <Checkbox defaultChecked={check} mx='auto' />
        <Checkbox defaultChecked={check} mx='auto' />
        <Checkbox defaultChecked={check} mx='auto' />
        <Checkbox defaultChecked={check} mx='auto' />
      </Grid>
    </Card>
  )
}
