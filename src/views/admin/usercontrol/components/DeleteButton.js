import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Flex
} from '@chakra-ui/react'
function DeleteButton (props) {
  const { children, tableConfig, tableData, modalName, ...rest } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button {...rest} onClick={onOpen}>
      {children}
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        size='md'
        // isCentered='true'
        useInert='false'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>确定删除以下用户？</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Flex  justifyContent='flex-end' mb={5}>
                              <Button mx={1} onClick={onClose}>取消</Button>
              <Button mx={1} colorScheme='red'>删除</Button>
              </Flex>

            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  )
}

export default DeleteButton
