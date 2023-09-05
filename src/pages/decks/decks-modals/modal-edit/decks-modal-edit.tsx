import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { z } from 'zod'

import iconEdit from '../../../../assets/icons/edit.svg'
import { Button, ControlledCheckbox, ControlledTextField, Modal } from '../../../../components'
import { useEditDeckMutation } from '../../../../services'
import Mask from '../../img/Mask.png'
import s from '../modal-create/decks-modal-create.module.scss'

const editSchema = z.object({
  deckName: z.string().nonempty().min(3),
  private: z.boolean().default(false),
  cover: z.instanceof(FileList).optional(),
})

type FormType = z.infer<typeof editSchema>

type Props = {
  decksId: string
  prevDeckName: string
  prevCover: string | null
  isPrevPrivate: boolean
}

export const DecksModalEdit: FC<Props> = ({ decksId, prevDeckName, prevCover, isPrevPrivate }) => {
  const [toggle, setToggle] = useState(false)
  const fileInput = useRef<HTMLInputElement | null>(null)
  const [deckCover, setDeckCover] = useState<Blob | string>(prevCover ?? Mask)
  const [editDecks, {}] = useEditDeckMutation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(editSchema),
  })

  const {
    field: { onChange },
  } = useController({
    name: 'cover',
    control,
  })

  const toggleModal = () => {
    setToggle(!toggle)
  }
  const handlePick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      onChange(e.currentTarget.files)
      setDeckCover(e.currentTarget.files[0])
    }
  }

  const onCancel = () => {
    reset()
    setDeckCover(prevCover ?? Mask)
    toggleModal()
  }
  const handleClick = () => {
    if (fileInput) {
      fileInput.current?.click()
    }
  }

  const onSubmit = (data: FormType) => {
    const formData = new FormData()

    formData.append('name', data.deckName)
    formData.append('isPrivate', String(data.private))
    if (data.cover) {
      formData.append('cover', data.cover[0])
    }

    editDecks({ formData, decksId })
      .unwrap()
      .then(res => {
        toast.success(`Deck ${res.name} editing`)
      })
      .catch(err => {
        if (err.data.message) {
          toast.error(err.data.message)
        } else {
          toast.error(err.data.errorMessages[0].message)
        }
      })
  }

  return (
    <>
      <img src={iconEdit} alt={'icon edit deck'} onClick={toggleModal} />
      <ToastContainer position={'top-center'} />

      <Modal
        isOpen={toggle}
        onClose={toggleModal}
        title={'Deck editing'}
        cancelButtonText={'Cancel'}
        onCancelButtonClick={onCancel}
        confirmButtonText={'Send'}
        onConfirmButtonClick={handleSubmit(onSubmit)}
      >
        <div className={s.decksCover}>
          <img
            src={typeof deckCover === 'string' ? deckCover : URL.createObjectURL(deckCover)}
            alt={'image deck'}
          />

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
          name={'deckName'}
          control={control}
          label={'New deck name'}
          placeholder={'name'}
          defaultValue={prevDeckName}
          errorMessage={errors.deckName?.message}
        />
        <ControlledCheckbox
          control={control}
          name={'private'}
          label={'Private pack'}
          defaultValue={isPrevPrivate}
        />
      </Modal>
    </>
  )
}
