import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Code
} from '@chakra-ui/react'
function DeleteButton(props) {
  const { children, isDisabled, onConfirm, users, ...rest } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  return (
    <Button {...rest} onClick={onOpen} isDisabled={isDisabled}>
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
          <ModalCloseButton isDisabled={isDisabled} />
          <ModalBody>
            <Code fontSize="md">{users.join(', ')}</Code>
          </ModalBody>
          <ModalFooter>
            <Button mx={1} onClick={onClose}>取消</Button>
            <Button mx={1} colorScheme='red' onClick={handleConfirm}>删除</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  )
}

export default DeleteButton
