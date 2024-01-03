import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

  Button
} from "@chakra-ui/react"
import React from "react";

export default function ReturnFocus(props) {
  const {isOpen, onOpen, onClose, children} = props;

  const finalRef = React.useRef()

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='6xl' useInert='false'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}