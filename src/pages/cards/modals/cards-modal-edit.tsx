import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { Button, ControlledTextField, Modal } from '../../../components'
import { Card, UpdateCardArgs, useUpdateCardsMutation } from '../../../services/cards'
import s from '../cards.module.scss'
import EditIcon from '../icons/EditIcon.tsx'
import Mask from '../img/no-image.png'

import { cardSchema } from './card-z-schema.ts'

import { DevTool } from '@hookform/devtools'

type zCard = z.infer<typeof cardSchema>

export const CardModalEdit = ({ currentCard }: { currentCard: Card }) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const [fileQuestion, setFileQuestion] = useState<Blob | null>(null)
  const [fileAnswer, setFileAnswer] = useState<Blob | null>(null)

  const questionImgRef = useRef<HTMLInputElement | null>(null)
  const answerImgRef = useRef<HTMLInputElement | null>(null)

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

    if (fileQuestion) {
      formData.append('questionImg', fileQuestion)
    }
    if (fileAnswer) {
      formData.append('answerImg', fileAnswer)
    }

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

  const handleChangeQuestionImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setFileQuestion(e.currentTarget.files[0])
    }
  }

  const handleChangeAnswerImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setFileAnswer(e.currentTarget.files[0])
    }
  }

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
            errorMessage={errors.question?.message}
          />

          {/*<ControlledImageInput name={'questionImg'} control={control} />*/}

          <img
            className={s.cardImgL}
            src={fileQuestion ? URL.createObjectURL(fileQuestion) : currentCard.questionImg ?? Mask}
            alt={'image question'}
            style={{ margin: '0 auto' }}
          />
          <input
            type={'file'}
            {...register('questionImg')}
            onChange={handleChangeQuestionImg}
            style={{ display: 'none' }}
            ref={e => (questionImgRef.current = e)}
          />

          <Button
            type={'button'}
            variant={'secondaryWithIcon'}
            fullWidth={true}
            onClick={() => questionImgRef.current?.click()}
          >
            Change Cover
          </Button>

          <div style={{ width: '100%', borderBottom: '1px  solid gray' }} />

          <ControlledTextField
            control={control}
            name={'answer'}
            label={'Answer'}
            placeholder={'Input your answer'}
            errorMessage={errors.answer?.message}
          />

          <img
            className={s.cardImgL}
            src={fileAnswer ? URL.createObjectURL(fileAnswer) : currentCard.answerImg ?? Mask}
            alt={'image answer'}
            style={{ margin: '0 auto' }}
          />
          <input
            type={'file'}
            {...register('answerImg')}
            style={{ display: 'none' }}
            onChange={handleChangeAnswerImg}
            ref={e => (answerImgRef.current = e)}
          />

          <Button
            type={'button'}
            variant={'secondaryWithIcon'}
            fullWidth={true}
            onClick={() => answerImgRef.current?.click()}
          >
            Change Cover
          </Button>
        </Modal>
      </form>
    </>
  )
}
