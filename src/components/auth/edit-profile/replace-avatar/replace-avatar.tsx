import { ChangeEvent, FC } from 'react'

import { Avatar } from '../../../ui'
import darkPencil from '../img/dark.svg'

import s from './replace-avatar.module.scss'

type PropsType = {
  src?: string
  replaceAvatar: (data: string | Blob) => void
}
export const ReplaceAvatar: FC<PropsType> = ({ src, replaceAvatar }) => {
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const imgFile = e.currentTarget.files[0]

      if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/png') {
        replaceAvatar(imgFile)
      } else {
        alert('This file is not not .jpg & .png')
      }
    }
  }

  return (
    <div className={s.wrapperAvatar}>
      <Avatar src={src} size={96} />
      <img src={darkPencil} alt={'icon pencil'} className={s.avatarEdit} />
      <label className={s.avatarEdit}>
        <input type="file" className={s.input} onChange={onChangeFile} />
      </label>
    </div>
  )
}
