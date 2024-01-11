import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  IconButton,
  Box,
  Text,
  Code,
  ModalFooter,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import { MdOutlineRefresh } from 'react-icons/md'
import { api } from 'variables/api';
function LogButton (props) {
  const { children, containerId, containerName, ...rest } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['fetchContainerLog', containerId],
    queryFn: () => api.get('service/log', {
      searchParams: { id: containerId }
    }).json().then(({ data }) => data.join('\n')),
  });

  return (
    <Button {...rest} onClick={onOpen}>
      {children}
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        size='4xl'
        useInert='false'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Code fontSize="xl">{containerName}</Code> 的运行日志
            <IconButton
              colorScheme='gray'
              icon={<MdOutlineRefresh size='60%' />}
              size='sm'
              ml="5px"
              onClick={() => refetch()}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' w="100%">
              <Flex w="100%">
                <Box bgColor='gray.300' w="100%" borderRadius='lg' p={3} maxH={400} overflowY='auto' overflowWrap='normal'>
                  <Text as='samp' w="100%">
                    {isFetching ? 'Loading...' : data}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Button>
  )
}

export default LogButton
