import { ComponentPropsWithoutRef, FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

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

type HeaderType = {
  userData?: UserType | null
  onLogout: () => void
} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderType> = ({ userData, onLogout }) => {
  const navigate = useNavigate()
  const profileHandler = () => {
    navigate('profile')
  }

  return (
    <div className={`${s.wrapperHeader}`}>
      <div className={s.container}>
        <Link to={'/'} className={s.linkHome}>
          <div className={s.logoContainer}>
            <h2 className={s.logo}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <span className={s.bracket}>[</span> app - cards <span className={s.bracket}>]</span>
            </h2>
          </div>
        </Link>
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
              <DropDownMenuItem
                className={s.myProfile}
                onSelect={profileHandler}
                icon={personIcon}
                text={'My Profile'}
              />
              <DropDownMenuItem icon={logOutIcon} text={'Sign Out'} onSelect={onLogout} />
            </DropDownMenu>
          </div>
        ) : (
          <Button as={'a'} href={'/login'}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
