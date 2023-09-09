import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { color } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

import { Button, ControlledTextField, Modal } from '../../../components'
import { ControlledImageInput } from '../../../components/ui/controlled/controlled-image-input/ControlledImageInput.tsx'
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

  const questionImgRef = useRef<HTMLInputElement | null>(null)
  const answerImgRef = useRef<HTMLInputElement | null>(null)

  const [currQuestionImg, setCurrQuestionImg] = useState(
    currentCard.questionImg ? currentCard.questionImg : Mask
  )
  const [currAnswerImg, setCurrAnswerImg] = useState(
    currentCard.answerImg ? currentCard.answerImg : Mask
  )

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
    debugger
    if (data?.questionImg?.length) {
      formData.append('questionImg', data.questionImg[0])
    }
    if (data?.answerImg?.length) {
      formData.append('answerImg', data.answerImg[0])
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

  const handleChangeQuestionImg = () => {
    if (questionImgRef.current?.files) {
      setCurrQuestionImg(URL.createObjectURL(questionImgRef.current?.files[0]))
    }
  }

  const handleClick = () => {
    if (questionImgRef) {
      questionImgRef.current?.click()
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
            src={currQuestionImg}
            alt={'image question'}
            style={{ margin: '0 auto' }}
          />
          <input
            type={'file'}
            {...register('questionImg')}
            ref={questionImgRef}
            onChange={handleChangeQuestionImg}
          />

          <Button
            type={'button'}
            variant={'secondaryWithIcon'}
            fullWidth={true}
            onClick={handleClick}
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
            src={currAnswerImg}
            alt={'image answer'}
            style={{ margin: '0 auto' }}
          />
          <input
            type={'file'}
            {...register('answerImg')}
            style={{ margin: '0 auto' }}
            ref={answerImgRef}
          />

          <Button
            type={'button'}
            variant={'secondaryWithIcon'}
            fullWidth={true}
            onClick={handleClick}
          >
            Change Cover
          </Button>
        </Modal>
      </form>
    </>
  )
}
