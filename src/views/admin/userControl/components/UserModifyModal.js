import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter
} from '@chakra-ui/react'
import React from 'react'

export default function UserModifyModal(props) {
  const { isOpen, onClose, onSave, modalTitle, isLoading, children } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody>
          {children}
          <ModalFooter>
            <Button mx={1} onClick={onClose} isLoading={isLoading}>取消</Button>
            <Button mx={1} colorScheme='brand' onClick={onSave} isLoading={isLoading}>保存</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
