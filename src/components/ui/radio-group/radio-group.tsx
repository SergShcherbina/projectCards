import { FC } from 'react'

import * as RadioGroupUI from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

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
  defaultValue?: string
  onValueChange: (value: string) => void
}

export const RadioGroup: FC<RadioGroupProps> = ({
  value,
  name,
  options,
  onValueChange,
  defaultValue,
  disabled,
  ...rest
}) => {
  const classNames = {
    root: clsx(s.root, disabled && s.disabled),
    item: clsx(s.item, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    wrapper: clsx(s.wrapper, disabled && s.disabled),
  }

  return (
    <>
      <Typography variant="subtitle1">{name}</Typography>
      <RadioGroupUI.Root
        onValueChange={onValueChange}
        disabled={disabled}
        {...rest}
        className={classNames.root}
        aria-label="View density"
        defaultValue={defaultValue}
      >
        {options.map(option => (
          <div className={classNames.wrapper} key={option.value}>
            <RadioGroupUI.Item
              id={option.label}
              key={option.value}
              value={option.value}
              className={classNames.item}
            >
              <RadioGroupUI.Indicator className={classNames.indicator} />
            </RadioGroupUI.Item>
            <label htmlFor={option.label}>
              <Typography as={'span'} variant="body2">
                {option.label}
              </Typography>
            </label>
          </div>
        ))}
      </RadioGroupUI.Root>
    </>
  )
}
