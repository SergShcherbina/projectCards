import { ChangeEvent, FC, useRef, useState } from 'react'

import { Button, Checkbox, TextField, Modal } from '../../../components'
import { useCreateDeckMutation } from '../../../services'
import Mask from '../img/Mask.png'

import s from './decks-modal.module.scss'

type Props = {
  toggleModal: boolean
  setToggleModal: (toggle: boolean) => void
}

export const DecksModal: FC<Props> = ({ toggleModal, setToggleModal }) => {
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [cover, setCover] = useState<string | Blob>(Mask)
  const filePicker = useRef<HTMLInputElement>(null)

  const [createDeck, { isLoading, isError }] = useCreateDeckMutation()

  const onCreateDeck = () => {
    const formData = new FormData()

    formData.append('name', inputValue)
    formData.append('isPrivate', String(checked))
    formData.append('cover', cover)
    createDeck(formData)

    onCancel()

    if (isError) {
      alert('Error witch onCreateDeck')
    }
  }

  const onModalToggle = (close: boolean = false) => {
    setToggleModal(close)
  }

  const onChangeValue = (value: string) => {
    setInputValue(value)
  }

  const onChecked = (check: boolean) => {
    setChecked(check)
  }

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCover(e.target.files[0])
    }
  }

  const handlePick = () => {
    filePicker.current?.click()
  }

  const onCancel = () => {
    onChangeValue('')
    onModalToggle(false)
    onChecked(false)
  }

  if (isLoading) return <div>{'Loading...'}</div>

  return (
    <Modal
      isOpen={toggleModal}
      onClose={onModalToggle}
      title={'Add New Pack'}
      cancelButtonText={'Cancel'}
      confirmButtonText={'Add new pack'}
      onCancelButtonClick={onCancel}
      onConfirmButtonClick={onCreateDeck}
    >
      <div className={s.decksCover}>
        <img
          src={typeof cover === 'string' ? Mask : URL.createObjectURL(cover)}
          alt={'image deck'}
        />
        <input
          type="file"
          className={s.hidden}
          onChange={onChangeFile}
          accept={'image/*, .png, .jpeg, .gif, .svg'}
          ref={filePicker}
        />
      </div>

      <Button variant={'secondaryWithIcon'} fullWidth={true} onClick={handlePick}>
        Change Cover
      </Button>

      <TextField
        type={'text'}
        value={inputValue}
        placeholder={'Input'}
        label={'Name Pack'}
        onChangeValue={onChangeValue}
      />
      <Checkbox label={'Private pack'} id={'id'} checked={checked} onChange={onChecked} />
    </Modal>
  )
}