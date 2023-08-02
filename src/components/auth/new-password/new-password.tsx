import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Card, ControlledTextField, Typography } from '../../ui'

import s from './new-password.module.scss'

const newPasswordSchema = z.object({
  password: z.string().nonempty('Password is required').min(3),
})

type NewPasswordType = z.infer<typeof newPasswordSchema>

export const NewPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmit = (data: NewPasswordType) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          type={'password'}
          className={s.password}
          errorMessage={errors.password?.message}
        />
        <Typography variant="body2" className={s.instructions}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type="submit" className={s.button}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
