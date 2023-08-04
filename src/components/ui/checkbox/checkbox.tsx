import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'

import { Typography } from '../typography'

import s from './checkbox.module.scss'
import checkboxChecked from './img/checked.svg'
import checkboxDisabledChecked from './img/disableChecked.svg'

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id: string
  className?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled,
  label,
  id,
  className,
}) => {
  const classLabel = disabled ? s.label + ' ' + s.disabled : s.label
  const classButtonWrapper = disabled ? s.buttonWrapper + ' ' + s.disabled : s.buttonWrapper

  // const classLabel = clsx(s.label, disabled && s.disabled)
  // const classButtonWrapper = clsx(s.buttonWrapper, disabled && s.disabled)
  return (
    <LabelRadix.Root className={`${classLabel} ${className}`}>
      <div className={classButtonWrapper}>
        <CheckboxRadix.Root
          className={s.root}
          checked={checked}
          onCheckedChange={() => onChange(!checked)}
          disabled={disabled}
          id={id}
        >
          <CheckboxRadix.Indicator className={s.indicator}>
            <img
              src={disabled ? checkboxDisabledChecked : checkboxChecked}
              alt={'checkbox image'}
            />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      <Typography variant="body2">{label}</Typography>
    </LabelRadix.Root>
  )
}
