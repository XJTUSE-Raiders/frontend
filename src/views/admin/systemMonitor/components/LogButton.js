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
  Text
} from '@chakra-ui/react'
import { MdOutlineRefresh } from 'react-icons/md'
function LogButton (props) {
  const { children, modalName, ...rest } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

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
          <ModalHeader>服务运行日志</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column'>
              <Flex>
                <Button variant='brand'>重启服务</Button>
                <IconButton
                  colorScheme='brand'
                  icon={<MdOutlineRefresh size='60%' />}
                  mx={1}
                />
              </Flex>
              <Flex my={3}>
                <Box bgColor='gray.300' borderRadius='lg' p={3} maxH={400} overflowY='auto' overflowWrap='normal'>
                  <Text as='samp'>
                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created                  The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  )
}

export default LogButton
