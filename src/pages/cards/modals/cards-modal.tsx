import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { Button, ControlledTextField, Modal } from '../../../components'
import {
  Card,
  CreateCardArgs,
  UpdateCardArgs,
  useCreateCardsMutation,
  useUpdateCardsMutation,
} from '../../../services/cards'
import s from '../cards.module.scss'
import Mask from '../img/no-image.png'

import { cardSchema } from './card-z-schema.ts'

type zCard = z.infer<typeof cardSchema>

type CardModalType = {
  currentCard?: Card
  deckId?: Card['id']
  show?: boolean
  setShow: (show: boolean) => void
}

export const CardModal = ({ currentCard, deckId, show = false, setShow }: CardModalType) => {
  const closeModal = () => setShow(false)

  const mode = currentCard === undefined ? 'new' : 'edit'

  const [fileQuestion, setFileQuestion] = useState<Blob | null>(null)
  const [fileAnswer, setFileAnswer] = useState<Blob | null>(null)

  const questionImgRef = useRef<HTMLInputElement | null>(null)
  const answerImgRef = useRef<HTMLInputElement | null>(null)

  const [updateCard] = useUpdateCardsMutation()
  const [createCard] = useCreateCardsMutation()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<zCard>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      question: currentCard?.question ? currentCard?.question : 'new question',
      answer: currentCard?.answer ? currentCard?.answer : 'new answer',
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

    if (mode === 'edit' && currentCard) {
      updateCard({ id: currentCard.id, data: formData } as unknown as UpdateCardArgs)
        .unwrap()
        .then(() => {
          toast.success('Card updated successfully')
        })
        .catch(err => {
          toast.error(err.data.message)
        })
        .finally(() => closeModal())
    }

    if (mode === 'new' && deckId) {
      createCard({ data: formData, deckId } as unknown as CreateCardArgs)
        .unwrap()
        .then(() => {
          toast.success('Card created successfully')
        })
        .catch(err => {
          toast.error(err.data.message)
        })
        .finally(() => closeModal())
    }
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

  {
    /*<DevTool control={control} />*/
  }

  return (
    <form onSubmit={handleCardUpdated}>
      <ToastContainer position={'top-center'} autoClose={20} />
      <Modal
        isOpen={show}
        onClose={closeModal}
        onConfirmButtonClick={handleCardUpdated}
        title={mode === 'edit' ? 'Edit Card' : 'New Card'}
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
          src={fileQuestion ? URL.createObjectURL(fileQuestion) : currentCard?.questionImg ?? Mask}
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
          src={fileAnswer ? URL.createObjectURL(fileAnswer) : currentCard?.answerImg ?? Mask}
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
  )
}
