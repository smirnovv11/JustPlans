import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import Button from '../button'

type Props = {
    header: string,
    message?: string,
    onSubmit: () => void
    setModal: (value: boolean) => void
    isOpen: boolean
}

const AskModal = ({
    header,
    message,
    onSubmit,
    setModal,
    isOpen
}: Props) => {

    const onClose = () => {
        setModal(false)
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={onSubmit}>Submit</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default AskModal
