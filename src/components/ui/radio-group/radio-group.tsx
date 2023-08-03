import { FC } from 'react'

import * as RadioGroupUI from '@radix-ui/react-radio-group'
// import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './radio-group.module.scss'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  options: Option[]
  value: string
  disabled?: boolean
  name: string
}

export const RadioGroup: FC<RadioGroupProps> = ({ value, name, options, disabled, ...rest }) => {
  const classNames = {
    item: s.item,
    indicator: s.indicator,
  }

  return (
    <>
      <Typography variant="subtitle1">{name}</Typography>
      <RadioGroupUI.Root disabled={disabled} {...rest}>
        {options.map(option => (
          <RadioGroupUI.Item key={option.value} value={option.value} className={classNames.item}>
            <RadioGroupUI.Indicator className={classNames.indicator} />
            <Typography as={'span'} variant="body2">
              {option.label}
            </Typography>
          </RadioGroupUI.Item>
        ))}
      </RadioGroupUI.Root>
    </>
  )
}
