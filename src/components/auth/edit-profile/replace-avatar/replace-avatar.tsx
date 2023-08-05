import { ChangeEvent, FC } from 'react'

import { Avatar } from '../../../ui'
import darkPencil from '../img/dark.svg'

import s from './replace-avatar.module.scss'

type PropsType = {
  src?: string
}
export const ReplaceAvatar: FC<PropsType> = ({ src }) => {
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const imgFile = e.currentTarget.files[0]

      alert(JSON.stringify({ name: imgFile.name, type: imgFile.type }))
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
