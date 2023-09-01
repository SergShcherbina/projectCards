import { ComponentPropsWithoutRef, FC } from 'react'

import { UserType } from '../../../services/auth'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { DropDownMenu } from '../drop-down-menu'
import { DropDownMenuHeader } from '../drop-down-menu/drop-down-menu-header/drop-down-menu-header.tsx'
import { DropDownMenuItem } from '../drop-down-menu/drop-down-menu-item/drop-down-menu-item.tsx'
import logOutIcon from '../drop-down-menu/img/logOut.svg'
import personIcon from '../drop-down-menu/img/personOutline.svg'
import { Typography } from '../typography'

import s from './header.module.scss'
import image from './img/logo.png'

type HeaderType = {
  userData?: UserType | null
  onLogout: () => void
  logo?: string
} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderType> = ({ logo = image, userData, onLogout }) => {
  return (
    <div className={`${s.wrapperHeader}`}>
      <img src={logo} className={s.logo} alt={'logo'} />
      {userData ? (
        <div className={s.info}>
          <Typography variant={'subtitle1'} className={s.name}>
            {userData.name}
          </Typography>
          <DropDownMenu trigger={<Avatar src={userData.avatar} />}>
            <DropDownMenuHeader
              userPhoto={userData.avatar}
              userName={userData.name}
              userEmail={userData.email}
            />
            <DropDownMenuItem icon={personIcon} text={'My Profile'} onClick={() => {}} />
            <DropDownMenuItem icon={logOutIcon} text={'Sign Out'} onClick={onLogout} />
          </DropDownMenu>
        </div>
      ) : (
        <Button as={'a'} href={'/login'}>
          Sign In
        </Button>
      )}
    </div>
  )
}
