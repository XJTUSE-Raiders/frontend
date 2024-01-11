import React, { useRef } from 'react'

// Chakra imports
import {
  Flex,
  Icon,
  Text,
  Spacer,
  useColorModeValue,
  Badge,
  ButtonGroup,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Code,
  useToast
} from '@chakra-ui/react'
import { FcOk, FcHighPriority } from 'react-icons/fc'
// Custom components
import Card from 'components/card/Card.js'

// Assets
import { HSeparator } from 'components/separator/Separator'
import { VSeparator } from 'components/separator/Separator'
import LogButton from './LogButton'
import { api } from 'variables/api'

export default function ContainerCard(props) {
  const { containerId, containerName, status, state, ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const isOk = state === 'running';
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [blocking, setBlocking] = React.useState(false);

  const handleRestart = () => {
    if (blocking) return;
    setBlocking(true);
    api.post('service/restart', {
      json: {
        id: containerId,
      },
    }).then(() => {
      setBlocking(false);
      toast({
        description: '服务重启成功',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }).catch((e) => {
      setBlocking(false);
      toast({
        description: `服务重启失败 (${e.message})`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    });
  }

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
              <LogButton containerId={containerId} containerName={containerName}>Logs</LogButton>
              <Button variant='brand' onClick={onOpen}>Restart</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={blocking ? false : true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              警告
            </AlertDialogHeader>

            <AlertDialogBody>
              本操作将会使服务可用性受到影响，确定要重新启动 <Code>{containerName}</Code> 吗？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={blocking}>
                取消
              </Button>
              <Button colorScheme='red' onClick={handleRestart} ml={3} isDisabled={blocking}>
                确认
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  )
}
