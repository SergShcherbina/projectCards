import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Checkbox } from '../../ui'

const loginShema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type LoginFormType = z.infer<typeof loginShema>

export const LoginForm = () => {
  const { register, handleSubmit, control } = useForm<LoginFormType>({
    resolver: zodResolver(loginShema),
  })
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  const onSubmit = (data: LoginFormType) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
        })}
      />
      {errors.email?.message}
      <input
        {...register('password', {
          required: 'Password is required',
        })}
      />
      {errors.password?.message}
      <Checkbox checked={value} onChange={onChange} label={'remember me'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
