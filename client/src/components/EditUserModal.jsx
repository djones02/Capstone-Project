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
import EditUser from './EditUser';

export default function EditUserModal({isOpen, onOpen, onClose, handleUserUpdate, user}) {
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
                            Edit User
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <EditUser user={user} onClose={onClose} handleUserUpdate={handleUserUpdate}/>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}