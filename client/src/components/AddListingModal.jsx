import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import AddListing from './AddListing';

export default function AddListingModal({isOpen, onOpen, onClose, addNewListing}) {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        size="xl"
        closeOnOverlayClick={false}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              Create New Listing
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
              <AddListing onClose={onClose} addNewListing={addNewListing}/>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
