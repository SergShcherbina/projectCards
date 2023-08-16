import { FC } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'

import s from './avatar.module.scss'
import defaultImg from './img/plugImg.jpg'

type AvatarType = {
  src?: string
  size?: number
  className?: string
}

export const Avatar: FC<AvatarType> = ({ src, size, className }) => {
  return (
    <AvatarRadix.Root
      className={`${s.avatarRoot} ${className}`}
      style={{ height: `${size}px `, width: `${size}px` }}
    >
      <AvatarRadix.Image className={s.avatarImage} src={src ? src : defaultImg} alt="User photo" />
      <AvatarRadix.Fallback className={s.avatarFallback}>AVA</AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
