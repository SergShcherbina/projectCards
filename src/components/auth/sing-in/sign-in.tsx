import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'
import { signInScheme } from '../validation/sing-in-scheme.ts'

import s from './sign-in.module.scss'

type SignInType = z.infer<typeof signInScheme>

export const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInScheme),
  })

  const onSubmit = (data: SignInType) => {
    alert(JSON.stringify(data))
  }

  return (
    <Card>
      <Typography variant={'large'}>Sign In</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Typography variant={'body2'} className={s.forgotPassword}>
          Forgot Password?
        </Typography>
        <Button type="submit" fullWidth={true}>
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'} className={s.questionStyle}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Don't have an account?
      </Typography>
      <Button variant={'link'} as={'a'} className={s.underlineBtn}>
        Sing Up
      </Button>
    </Card>
  )
}
