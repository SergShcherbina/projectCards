import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'
import icon from './img/sampleIcon.svg'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'primaryWithIcon' | 'secondaryWithIcon'
  fullWidth?: boolean
  className?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    as: Component = 'button',
    ...rest
  } = props

  return (
    <Component
      className={`${s[variant]} ${s.commonStyle} ${fullWidth ? s.fullWidth : ''} ${
        disabled ? s.disabled : ''
      } ${className} `}
      {...rest}
      disabled={disabled}
    >
      <span className={s.byCenter}>
        {(variant === 'primaryWithIcon' || variant === 'secondaryWithIcon') && (
          <img src={icon} alt={'icon'} />
        )}
        {rest.children}
      </span>
    </Component>
  )
}
