import { FC, ReactNode } from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

export const Select = () => {
  return (
    <div className={s.root}>
      <SelectRadix.Root open>
        <SelectRadix.Trigger className={s.selectTrigger}>
          <SelectRadix.Value placeholder="Select value" />
          <SelectRadix.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={s.selectContent}
            defaultValue={'apple'}
            align={'start'}
            position={'popper'}
          >
            <SelectRadix.ScrollUpButton className={s.selectScrollButton}>
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>
            <SelectRadix.Viewport className={s.selectViewport}>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton className={s.selectScrollButton}>
              <ChevronDownIcon />
            </SelectRadix.ScrollDownButton>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type selectItemPropsType = {
  value: string
  children: ReactNode
}

const SelectItem: FC<selectItemPropsType> = ({ children, ...props }) => {
  return (
    <SelectRadix.Item className={s.selectItem} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className={s.selectItemIndicator}>
        <CheckIcon />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  )
}
