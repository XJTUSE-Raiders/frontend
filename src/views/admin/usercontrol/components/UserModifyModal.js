import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button
} from '@chakra-ui/react'
import React from 'react'

export default function ReturnFocus (props) {
  const { isOpen, onClose, modalName, children } = props

  const finalRef = React.useRef()

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='4xl'
        useInert='false'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>{children}</Flex>
            <Flex justifyContent='flex-end'>
              <Button mx={1}>取消</Button>
              <Button mx={1} colorScheme='brand'>保存</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
