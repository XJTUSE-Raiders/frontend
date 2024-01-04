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
  const {isOpen, onOpen, onClose, title, children} = props;

  const finalRef = React.useRef()

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='6xl' useInert='false'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>详细统计信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">下载</Button>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              关闭
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}