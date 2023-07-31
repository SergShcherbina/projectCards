import { FC } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type AvatarType = {
  src?: string
  size?: number
}

export const Avatar: FC<AvatarType> = ({ src, size }) => {
  return (
    <div>
      <AvatarRadix.Root
        className={s.avatarRoot}
        style={{ height: `${size}px `, width: `${size}px` }}
      >
        <AvatarRadix.Image className={s.avatarImage} src={src} alt="User photo" />
        <AvatarRadix.Fallback className={s.avatarFallback}>AVA</AvatarRadix.Fallback>
      </AvatarRadix.Root>
    </div>
  )
}
