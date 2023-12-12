import { ChangeEvent, FC } from 'react'

import { Avatar } from '../../index.ts'
import darkPencil from '../img/pencel-dark.svg'

import s from './replace-avatar.module.scss'

type PropsType = {
  src?: string
  replaceAvatar: (data: string | Blob) => void
}
export const ReplaceAvatar: FC<PropsType> = ({ src, replaceAvatar }) => {
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const imgFile = e.currentTarget.files[0]

      replaceAvatar(imgFile)
    }
  }

  return (
    <div className={s.wrapperAvatar}>
      <label className={s.avatarEdit}>
        <Avatar src={src} size={96} />
        <img src={darkPencil} alt={'icon pencil'} className={s.avatarEditIcon} />

        <input
          type="file"
          className={s.input}
          onChange={onChangeFile}
          accept={'image/*, .png, .jpeg, .svg, .gif'}
        />
      </label>
    </div>
  )
}
