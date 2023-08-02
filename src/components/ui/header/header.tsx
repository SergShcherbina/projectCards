import { ComponentPropsWithoutRef, FC } from 'react'

import { Avatar } from '../avatar'
import { Button } from '../button'
import { Typography } from '../typography'

import s from './header.module.scss'
import image from './img/Logo.png'

type HeaderType = {
  logo?: string
  isAuth: boolean
  userName: string
  userImage?: string
} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderType> = ({ logo = image, isAuth, userName, userImage }) => {
  return (
    <div className={`${s.wrapperHeader}`}>
      <img src={logo} className={s.logo} alt={'logo'} />
      {isAuth ? (
        <div className={s.info}>
          <Typography variant={'subtitle1'} className={s.name}>
            {userName}
          </Typography>
          <Avatar src={userImage} />
        </div>
      ) : (
        <Button>{'Sing In'}</Button>
      )}
    </div>
  )
}
