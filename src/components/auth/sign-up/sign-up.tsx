import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'
import { signUpScheme } from '../validation'

import s from './sign-up.module.scss'

type SignUpType = z.infer<typeof signUpScheme>

export const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpScheme),
  })

  const onSubmit = (data: SignUpType) => {
    alert(JSON.stringify(data))
  }

  return (
    <Card>
      <Typography variant={'large'}>Sign Up</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" fullWidth={true}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={s.questionStyle}>
        Already have an account?
      </Typography>
      <Button variant={'link'} as={'a'} className={s.underlineBtn}>
        Sign In
      </Button>
    </Card>
  )
}
