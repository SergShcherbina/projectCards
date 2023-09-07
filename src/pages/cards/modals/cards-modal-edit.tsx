import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { ControlledTextField, Modal } from '../../../components'
import { ControlledImageInput } from '../../../components/ui/controlled/controlled-image-input/ControlledImageInput.tsx'
import { Card, useUpdateCardsMutation } from '../../../services/cards'
import EditIcon from '../icons/EditIcon.tsx'

import { cardSchema } from './card-z-schema.ts'

type zCard = {
  question: string
  answer: string
  answerImg: File[]
  questionImg: File[]
}

//type zCard = z.infer<typeof cardSchema>

export const CardModalEdit = ({ currentCard }: { currentCard: Card }) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const [updateCard] = useUpdateCardsMutation()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<zCard>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: currentCard.question,
      answer: currentCard.answer,
    },
  })

  const handleCardUpdated = handleSubmit((data: zCard) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg[0])

    updateCard({ id: currentCard.id, data: formData })
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

        <ControlledImageInput name={'questionImg'} control={control} />
        <input type={'file'} {...register('questionImg')} />
        {/*<input type={'text'} value={errors.questionImg?.message} />*/}
        {/*<img*/}
        {/*  src={typeof answerImg === 'string' ? answerImg : URL.createObjectURL(answerImg)}*/}
        {/*  alt={'image deck'}*/}
        {/*/>*/}

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
