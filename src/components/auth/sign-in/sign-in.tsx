import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'
import { signInScheme } from '../validation/sing-in-scheme.ts'

import s from './sign-in.module.scss'

export type SignInType = z.infer<typeof signInScheme>
type SignInPropsType = {
  onSubmit: (data: SignInType) => void
  isSubmitting: boolean
}
export const SignIn: FC<SignInPropsType> = ({ onSubmit, isSubmitting }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInScheme),
    mode: 'onSubmit',
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit({ email: data.email, password: data.password, rememberMe: data.rememberMe })
  })

  return (
    <Card>
      <Typography variant={'large'}>Sign In</Typography>
      <form className={s.form} onSubmit={onSubmitForm}>
        <DevTool control={control} />

        <ControlledTextField
          control={control}
          name={'email'}
          label={'Email'}
          type={'text'}
          className={s.inputMargin}
          errorMessage={errors.email?.message}
        />

        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          type={'password'}
          errorMessage={errors.password?.message}
        />
        <ControlledCheckbox
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
          className={s.rememberMe}
        />
        <Button variant={'link'} as={'a'} href={'/sign-up'} className={s.forgotPassword}>
          Forgot Password?
        </Button>
        <Button type="submit" fullWidth={true} disabled={isSubmitting}>
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'} className={s.questionStyle}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Don't have an account?
      </Typography>
      <Button variant={'link'} as={'a'} href={'/sign-up'} className={s.underlineBtn}>
        Sing Up
      </Button>
    </Card>
  )
}
