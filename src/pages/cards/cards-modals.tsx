import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button, ControlledTextField } from '../../components'
import { Modal } from '../../components/ui/modal'
import { useCreateCardsMutation } from '../../services/cards'

const cardSchema = z.object({
  question: z.string().min(3).max(200),
  answer: z.string().min(3).max(200),
})

type NewCard = z.infer<typeof cardSchema>

export const CardModal = ({ deckId }: { deckId: string }) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const [createCard] = useCreateCardsMutation()

  const { control, handleSubmit } = useForm<NewCard>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const handleCardCreated = handleSubmit((args: NewCard) => {
    createCard({ ...args, deckId })
      .unwrap()
      .then(() => {
        toast.success('Card created successfully')
        closeModal()
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  })

  return (
    <>
      <Button onClick={openModal}>Add New Card</Button>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onConfirmButtonClick={handleCardCreated}
        title={'Add New Card'}
        cancelButtonText="Cancel"
        confirmButtonText="Add New Card"
      >
        <form onSubmit={handleCardCreated}>
          <ControlledTextField control={control} name={'question'} />
          <ControlledTextField control={control} name={'answer'} />
        </form>
      </Modal>
    </>
  )
}
