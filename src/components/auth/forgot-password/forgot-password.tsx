import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './forgot-password.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string().nonempty().email(),
})

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordType) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          name={'email'}
          label={'Email'}
          type={'text'}
          className={s.email}
          errorMessage={errors.email?.message}
        />
        <Typography variant="body2" className={s.instructions}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type="submit" className={s.button}>
          Send Instructions
        </Button>
      </form>
      <Typography variant={'body2'} className={s.caption}>
        Do you remember you password?
      </Typography>
      <Button variant={'link'} as={'a'} className={s.loginLink}>
        Try logging in
      </Button>
    </Card>
  )
}
