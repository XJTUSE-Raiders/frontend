import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Spacer
} from '@chakra-ui/react'
import React from 'react'

export default function ReturnFocus (props) {
  const { isOpen, onClose, children } = props

  const finalRef = React.useRef()

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='6xl'
        useInert='false'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >
          用户详细信息
              {/* <Flex my='5'>用户详细信息</Flex> */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
