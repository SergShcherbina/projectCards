import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { Button, ControlledTextField, Modal } from '../../../components'
import { ControlledImageInput } from '../../../components/ui/controlled/controlled-image-input/ControlledImageInput.tsx'
import { Card, UpdateCardArgs, useUpdateCardsMutation } from '../../../services/cards'
import EditIcon from '../icons/EditIcon.tsx'

import { cardSchema } from './card-z-schema.ts'

import { DevTool } from '@hookform/devtools'

type zCard = {
  question: string
  answer: string
  questionImg: File[] | string
  answerImg: File[] | string
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
      questionImg: currentCard.questionImg,
      answerImg: currentCard.answerImg,
    },
  })

  const handleCardUpdated = handleSubmit((data: zCard) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg[0])
    formData.append('answerImg', data.answerImg[0])

    updateCard({ id: currentCard.id, data: formData } as unknown as UpdateCardArgs)
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
      <form onSubmit={handleCardUpdated}>
        <DevTool control={control} />
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

          {/*<ControlledImageInput name={'questionImg'} control={control} />*/}

          {/*<img src={...register('questionImg')} alt={'image question'} />*/}
          {/*<input type={'file'} {...register('questionImg')} />*/}
          <input type={'file'} {...register('questionImg')} />
          {/*<Button variant={'secondaryWithIcon'} fullWidth={true}>*/}
          {/*  {*/}
          {/*    <label>*/}
          {/*      <input type={'file'} {...register('questionImg')} />*/}
          {/*    </label>*/}
          {/*  }*/}
          {/*</Button>*/}

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
      </form>
    </>
  )
}
