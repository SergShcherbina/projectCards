import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { ControlledTextField, Modal } from '../../../components'
import { Card, useUpdateCardsMutation } from '../../../services/cards'
import EditIcon from '../icons/EditIcon.tsx'

import { cardSchema } from './card-z-schema.ts'

type zCard = z.infer<typeof cardSchema>

export const CardModalEdit = ({ currentCard }: { currentCard: Card }) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const [updateCard] = useUpdateCardsMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<zCard>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: currentCard.question,
      answer: currentCard.answer,
      answerImg: currentCard.answerImg,
      questionImg: currentCard.questionImg,
    },
  })

  const handleCardUpdated = handleSubmit((args: zCard) => {
    updateCard({ ...args, id: currentCard.id })
      .unwrap()
      .then(() => {
        toast.success('Card updated successfully', {
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
  })

  return (
    <>
      <EditIcon onClick={openModal}>
        <ToastContainer />
      </EditIcon>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onConfirmButtonClick={handleCardUpdated}
        title={'Edit Card'}
        cancelButtonText="Cancel"
        confirmButtonText="Save Changes"
      >
        <ControlledTextField
          control={control}
          name={'question'}
          label={'Question'}
          placeholder={'Input your question'}
          errorMessage={errors.root?.message}
        />
        <ControlledTextField
          control={control}
          name={'answer'}
          label={'Answer'}
          placeholder={'Input your answer'}
          errorMessage={errors.answer?.message}
        />
      </Modal>
    </>
  )
}
