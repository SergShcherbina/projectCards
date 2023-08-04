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
}

export const RadioGroup: FC<RadioGroupProps> = ({ value, name, options, disabled, ...rest }) => {
  const classNames = {
    root: clsx(s.root, disabled && s.disabled),
    item: clsx(s.item, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    wrapper: clsx(s.wrapper, disabled && s.disabled),
  }

  return (
    <>
      <Typography variant="subtitle1">{name}</Typography>
      <RadioGroupUI.Root disabled={disabled} {...rest} className={classNames.root}>
        {options.map(option => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={classNames.wrapper}>
              <RadioGroupUI.Item
                key={option.value}
                value={option.value}
                className={classNames.item}
              >
                <RadioGroupUI.Indicator className={classNames.indicator} />
              </RadioGroupUI.Item>
            </div>

            <Typography as={'span'} variant="body2">
              {option.label}
            </Typography>
          </div>
        ))}
      </RadioGroupUI.Root>
    </>
  )
}
