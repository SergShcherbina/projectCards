import { FC, ReactNode } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type selectPropsType = {
  options?: number[]
  value?: number
  onChange?: (value: number) => void
}

export const Select: FC<selectPropsType> = ({ options, onChange, value }) => {
  return (
    <div className={s.root}>
      <SelectRadix.Root value={value ? value.toString() : ''}>
        <SelectRadix.Trigger className={s.selectTrigger}>
          <SelectRadix.Value placeholder="Select value" />
          <SelectRadix.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={s.selectContent}
            defaultValue={'0'}
            align={'start'}
            position={'popper'}
          >
            <SelectRadix.ScrollUpButton className={s.selectScrollButton}>
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>
            <SelectRadix.Viewport className={s.selectViewport}>
              {options?.map(el => (
                <SelectItem onChange={onChange} key={el} value={el.toString()}>
                  {el}
                </SelectItem>
              ))}
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
  children: ReactNode
  value: string
  onChange?: (value: number) => void
}

const SelectItem: FC<selectItemPropsType> = ({ children, onChange, ...props }) => {
  const onChangeHandler = (e: any) => {
    onChange?.(e.currentTarget.value)
  }

  return (
    <SelectRadix.Item onChange={onChangeHandler} className={s.selectItem} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}
