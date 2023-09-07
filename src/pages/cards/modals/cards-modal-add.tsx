import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { Button, ControlledTextField, Modal } from '../../../components'
import { useCreateCardsMutation } from '../../../services/cards'

import { cardSchema } from './card-z-schema.ts'

type TCard = z.infer<typeof cardSchema>

export const CardModalAdd = ({ deckId }: { deckId: string }) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const [createCard] = useCreateCardsMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCard>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const handleCardCreated = handleSubmit((args: TCard) => {
    createCard({ ...args, deckId })
      .unwrap()
      .then(() => {
        toast.success('Card created successfully', {
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
      <Button onClick={openModal}>
        Add New Card
        <ToastContainer />
      </Button>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onConfirmButtonClick={handleCardCreated}
        title={'Add New Card'}
        cancelButtonText="Cancel"
        confirmButtonText="Add New Card"
      >
        <ControlledTextField
          control={control}
          name={'question'}
          label={'Question'}
          placeholder={'Input your question'}
          errorMessage={errors.question?.message}
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
