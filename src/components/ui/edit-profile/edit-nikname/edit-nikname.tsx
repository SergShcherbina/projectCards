import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledTextField } from '../../../ui'

import s from './edit-nikname.module.scss'
import { nicknameScheme } from './validation'

type PropsType = {
  onEditName: (userName: string) => void
} & z.infer<typeof nicknameScheme>

export const EditNikname: FC<PropsType> = ({ onEditName }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropsType>({
    resolver: zodResolver(nicknameScheme),
  })

  const onSubmit = (value: PropsType) => {
    onEditName(value.nickname)
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
