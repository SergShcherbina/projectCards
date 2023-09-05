import { FC, useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'

import { Spinner } from '../../../../assets'
import iconDelete from '../../../../assets/icons/delete.svg'
import { Modal, Typography } from '../../../../components'
import { useDeleteDeckMutation } from '../../../../services'

type Props = {
  decksId: string
}

export const DecksModalDelete: FC<Props> = ({ decksId }) => {
  const [toggle, setToggle] = useState(false)

  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()

  const toggleModal = () => {
    setToggle(!toggle)
  }

  const onDeleteDeck = () => {
    deleteDeck(decksId)
      .unwrap()
      .then(res => {
        toast.success(`Deck ${res.name} removed`)
        toggleModal()
      })
      .catch(err => {
        if (err.data.message) {
          toast.error(err.data.message)
        } else {
          toast.error(err.data.errorMessages[0].message)
        }
      })
      .finally(() => toggleModal)
  }

  return (
    <>
      <img src={iconDelete} alt={'icon decks delete'} onClick={toggleModal} />
      <ToastContainer position={'top-center'} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Modal
          isOpen={toggle}
          onClose={toggleModal}
          title={'Delete Pack'}
          cancelButtonText={'Cancel'}
          confirmButtonText={'Yes, I am sure'}
          onConfirmButtonClick={onDeleteDeck}
        >
          <Typography variant={'subtitle1'}>Are you sure you want to delete the deck?</Typography>
        </Modal>
      )}
    </>
  )
}
