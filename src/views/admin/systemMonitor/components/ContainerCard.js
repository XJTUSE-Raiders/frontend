import React from 'react'

// Chakra imports
import {
  Flex,
  Box,
  Icon,
  Text,
  Spacer,
  useColorModeValue,
  Badge,
  ButtonGroup,
  Button
} from '@chakra-ui/react'
import { FcOk, FcHighPriority } from 'react-icons/fc'
// Custom components
import Card from 'components/card/Card.js'

// Assets
import { HSeparator } from 'components/separator/Separator'
import { VSeparator } from 'components/separator/Separator'
import LogButton from './LogButton'

export default function ContainerCard(props) {
  const { containerId, containerName, status, state, ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const isOk = state === 'running';
  function colorStatus() {
    return isOk === 'true' ? 'green' : 'red'
  }

  // Chakra Color Mode
  return (
    <Card
      alignSelf='center'
      w={{ base: '100%', md: '60%', xl: '99%' }}
      mx='auto'
      p='20px'
      {...rest}
    >
      <Flex direction='column' color={textColor} h='100%' w='100%'>
        <Flex justify='space-between' align='center' mb='5px'>
          <Flex direction='column'>
            <Text fontSize='2xl' fontWeight='bold'>
              Service
            </Text>
            <Flex w='100%'>
              <Text fontSize='xl' as='samp' mr={2}>
                {containerName}
              </Text>
            </Flex>
          </Flex>

          <Icon as={isOk ? FcOk : FcHighPriority} w='50px' h='auto' color='gray.400' />
        </Flex>
        <HSeparator />
        <Flex direction='column'>
          <Flex mt='14px'>
            <Flex direction='column' me='34px'>
              <Text fontSize='lg' fontWeight='bold'>
                Status
              </Text>
              <Text fontSize='md' fontWeight='500' as='samp'>
                {status}
              </Text>
            </Flex>
            <Spacer>
              <VSeparator />
            </Spacer>
            <Flex direction='column'>
              <Text fontSize='lg' fontWeight='bold'>
                状态
              </Text>
              <Badge variant='subtle' colorScheme={isOk ? 'green' : 'red'} alignSelf='center'>
                {state}
              </Badge>
            </Flex>
          </Flex>
          <Flex mt={5} justifyContent='flex-end'>
            <ButtonGroup spacing='3'>
              <LogButton>Logs</LogButton>
              <Button variant='brand'>Restart</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}
