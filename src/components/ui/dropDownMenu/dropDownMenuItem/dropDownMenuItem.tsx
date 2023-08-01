import { FC } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import { Typography } from '../../typography'

import s from './dropDownMenuItem.module.scss'

type DropDownMenuItemType = {
  text: string
  icon?: string
  onClick: () => void
}

export const DropDownMenuItem: FC<DropDownMenuItemType> = ({ text, icon, onClick }) => {
  return (
    <DropdownMenuRadix.Item className={s.wrapperItems} onSelect={onClick}>
      <div className={s.item}>
        <img className={s.icon} src={icon} alt={'icon'} />
        <Typography className={s.text} variant={'caption'} as={'span'}>
          {text}
        </Typography>
      </div>
    </DropdownMenuRadix.Item>
  )
}
