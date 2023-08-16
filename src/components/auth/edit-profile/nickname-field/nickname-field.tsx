import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledTextField } from '../../../ui'

import s from './nickname-field.module.scss'
import { nicknameScheme } from './validation'

type PropsType = {
  onReplaceName: (text: string) => void
} & z.infer<typeof nicknameScheme>

export const EditName: FC<PropsType> = ({ onReplaceName }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropsType>({
    resolver: zodResolver(nicknameScheme),
  })

  const onSubmit = (data: PropsType) => {
    onReplaceName(data.nickname)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        control={control}
        name={'nickname'}
        label={'Nickname'}
        type={'text'}
        className={s.inputMargin}
        errorMessage={errors.nickname?.message}
      />

      <Button variant={'primary'} type="submit">
        Save Change
      </Button>
    </form>
  )
}
