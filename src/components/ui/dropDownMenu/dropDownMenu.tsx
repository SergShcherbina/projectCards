import { FC, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

type DropDownMenuType = {
  trigger: ReactNode
  children: ReactNode
}
export const DropDownMenu: FC<DropDownMenuType> = ({ trigger, children }) => {
  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger>{trigger}</DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          className={s.dropdownMenuContent}
          sideOffset={14}
          align={'end'}
          alignOffset={-5}
        >
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}
