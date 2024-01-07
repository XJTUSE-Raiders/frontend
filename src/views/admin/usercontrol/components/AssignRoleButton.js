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
  Select
} from '@chakra-ui/react'
function AssignRoleButton (props) {
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
          <ModalHeader>批量修改用户角色</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Select placeholder='选择角色' mb={10}>
                <option>访客</option>
                <option>用户</option>
                <option>前台管理员</option>
                <option>后台管理员</option>
              </Select>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  )
}

export default AssignRoleButton
