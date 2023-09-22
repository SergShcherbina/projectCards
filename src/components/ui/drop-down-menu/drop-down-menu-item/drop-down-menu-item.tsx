import { ComponentPropsWithoutRef, ElementType } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import { Typography } from '../../typography'

import s from './drop-down-menu-item.module.scss'

type DropDownMenuItemType<T extends ElementType = 'div'> = {
  as?: T
  text: string
  icon?: string | undefined
  onSelect?: () => void
} & ComponentPropsWithoutRef<T>

export const DropDownMenuItem = <T extends ElementType = 'div'>({
  text,
  icon,
  onSelect,
  as,
  className,
  ...rest
}: DropDownMenuItemType<T>) => {
  const onSelectHandler = (e: Event) => {
    onSelect && onSelect()
    e.preventDefault()
  }
  const TagName = as || 'div'

  return (
    <DropdownMenuRadix.Item className={`${className} ${s.wrapperItems}`} onSelect={onSelectHandler}>
      <div className={s.item}>
        <img className={s.icon} src={icon} alt={'icon'} />
        <TagName {...rest}>
          <Typography className={s.text} variant={'caption'}>
            {text}
          </Typography>
        </TagName>
      </div>
    </DropdownMenuRadix.Item>
  )
}
