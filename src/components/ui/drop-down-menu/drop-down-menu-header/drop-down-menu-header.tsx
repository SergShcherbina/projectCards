import { FC } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import { Avatar } from '../../avatar'
import { Typography } from '../../typography'

import s from './drop-down-menu-header.module.scss'

type DropDownMenuItemType = {
  userName: string
  userEmail: string
  userPhoto?: string
}

export const DropDownMenuHeader: FC<DropDownMenuItemType> = ({
  userName,
  userEmail,
  userPhoto,
}) => {
  return (
    <DropdownMenuRadix.Item className={s.wrapperItems}>
      <div className={s.item}>
        <Avatar src={userPhoto} />
        <div className={s.title}>
          <Typography variant={'subtitle2'} as={'span'}>
            {userName}
          </Typography>
          <Typography className={s.email} variant={'caption'} as={'span'}>
            {userEmail}
          </Typography>
        </div>
      </div>
    </DropdownMenuRadix.Item>
  )
}
