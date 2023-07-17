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
import ListingEdit from './ListingEdit';

export default function EditListingModal({isOpen, onOpen, onClose, handleListingUpdate, listing}) {
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
                            Edit Listing
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <ListingEdit listing={listing} onClose={onClose} handleListingUpdate={handleListingUpdate}/>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
