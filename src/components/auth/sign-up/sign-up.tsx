import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'
import { signUpScheme } from '../validation'

import s from './sign-up.module.scss'

export type SignUpType = z.infer<typeof signUpScheme>

type Props = {
  onSubmit: (data: SignUpType) => void
  isSubmitting: boolean
  className: string
}

export const SignUp: FC<Props> = ({ onSubmit, isSubmitting, className }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpScheme),
  })

  const onSubmitValue = (data: SignUpType) => {
    onSubmit(data)
  }

  return (
    <Card className={className}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmitValue)}>
        {/**/}
        <DevTool control={control} />
        {/**/}

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
          className={s.inputMargin}
          errorMessage={errors.password?.message}
        />

        <ControlledTextField
          control={control}
          name={'confirmPassword'}
          label={'Confirm Password'}
          type={'password'}
          className={s.lastInputMargin}
          errorMessage={errors.confirmPassword?.message}
        />

        <Button type="submit" fullWidth={true} disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={s.questionStyle}>
        Already have an account?
      </Typography>
      <Button variant={'link'} as={Link} to={'/login'} className={s.underlineBtn}>
        Sign In
      </Button>
    </Card>
  )
}
