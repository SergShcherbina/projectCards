import { ChangeEvent, FC, useRef, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'

import { Spinner } from '../../../../assets'
import { Button, Modal, ControlledTextField, ControlledCheckbox } from '../../../../components'
import { useCreateDeckMutation } from '../../../../services'
import Mask from '../../img/Mask.png'

import s from './decks-modal-create.module.scss'

type Props = {
  toggleModal: boolean
  setToggleModal: (toggle: boolean) => void
}

const createDeckSchema = z.object({
  nameDeck: z.string().nonempty().min(3),
  cover: z.instanceof(FileList).optional(),
  private: z.boolean().default(false),
})

type FormValues = z.infer<typeof createDeckSchema>

export const DecksModalCreate: FC<Props> = ({ toggleModal, setToggleModal }) => {
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [deckCover, setDeckCover] = useState<Blob | null>(null)

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createDeckSchema),
  })

  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const {
    field: { onChange },
  } = useController({
    name: 'cover',
    control,
  })

  const handleModalToggle = (close: boolean = false) => {
    setToggleModal(close)
  }

  const handlePick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      onChange(e.currentTarget.files)
      setDeckCover(e.currentTarget.files[0])
    }
  }

  const onCancel = () => {
    reset()
    setDeckCover(null)
    setValue('private', false)
    handleModalToggle(false)
  }
  const handleClick = () => {
    if (fileInput) {
      fileInput.current?.click()
    }
  }

  const onCreateDeck = handleSubmit((data: FormValues) => {
    const formData = new FormData()

    formData.append('name', data.nameDeck)
    formData.append('isPrivate', String(data.private))
    if (data.cover) {
      formData.append('cover', data.cover[0])
    }

    createDeck(formData)
      .unwrap()
      .then(res => {
        toast.success(`${res.author.name}, your pack has been added`)
        onCancel()
      })
      .catch(err => {
        if (err.data.message) {
          toast.error(err.data.message)
        } else {
          toast.error(err.data.errorMessages[0].message)
        }
      })
  })

  return (
    <>
      <ToastContainer position={'top-center'} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Modal
          isOpen={toggleModal}
          onClose={handleModalToggle}
          title={'Add New Pack'}
          cancelButtonText={'Cancel'}
          confirmButtonText={'Add new pack'}
          onCancelButtonClick={onCancel}
          onConfirmButtonClick={onCreateDeck}
        >
          <DevTool control={control} />
          <div className={s.decksCover}>
            <img src={deckCover ? URL.createObjectURL(deckCover) : Mask} alt={'image deck'} />

            <input
              {...register('cover')}
              onChange={handlePick}
              type={'file'}
              accept={'image/*, .png, .jpeg, .svg, .gif'}
              className={s.hidden}
              ref={e => (fileInput.current = e)}
            />
          </div>
          <Button
            type={'button'}
            variant={'secondaryWithIcon'}
            fullWidth={true}
            onClick={handleClick}
          >
            Change Cover
          </Button>

          <ControlledTextField
            control={control}
            name={'nameDeck'}
            type={'text'}
            placeholder={'Name'}
            label={'Name Pack'}
            defaultValue={''}
            errorMessage={errors.nameDeck?.message}
          />
          <ControlledCheckbox control={control} name={'private'} label={'Private pack'} />
        </Modal>
      )}
    </>
  )
}
