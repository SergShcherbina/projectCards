import { useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Modal } from '../../../components/ui/modal'
import { useDeleteCardsMutation } from '../../../services/cards'
import TrashIcon from '../icons/TrashIcon.tsx'

export const CardModalDelete = ({ cardId }: { cardId: string }) => {
  const [deleteCard] = useDeleteCardsMutation()
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const handleCardDelete = () => {
    deleteCard({ cardId })
      .unwrap()
      .then(() => {
        toast.success('Card delete successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 20,
        })
      })
      .catch(err => {
        toast.error(err.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      })
      .finally(() => closeModal())
  }

  return (
    <>
      <TrashIcon onClick={openModal}>
        <ToastContainer />
      </TrashIcon>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onConfirmButtonClick={handleCardDelete}
        title={'Delete Card'}
        cancelButtonText="Cancel"
        confirmButtonText="Delete Card"
      >
        Do you really want to remove? This card will be deleted.
      </Modal>
    </>
  )
}
