import { FC, ReactNode, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectPropsType = {
  className: string
  options?: number[]
  value?: number
  onChangeValue: (value: number) => void
}

export const Select: FC<SelectPropsType> = ({ options, value, onChangeValue, className }) => {
  const [open, setOpen] = useState(false)
  const onChangeSelect = (value: string) => {
    onChangeValue(+value)
  }

  return (
    <div className={`${className}`}>
      <SelectRadix.Root onValueChange={onChangeSelect} onOpenChange={() => setOpen(!open)}>
        <SelectRadix.Trigger className={s.selectTrigger}>
          <SelectRadix.Value placeholder={value} />
          <SelectRadix.Icon>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.selectContent} position={'popper'}>
            <SelectRadix.Viewport>
              <SelectRadix.Group>
                {options?.map(el => (
                  <SelectItem key={el} value={el.toString()}>
                    {el}
                  </SelectItem>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type SelectItemPropsType = {
  children: ReactNode
  value: string
}

const SelectItem: FC<SelectItemPropsType> = ({ children, ...props }) => {
  return (
    <SelectRadix.Item className={s.selectItem} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
