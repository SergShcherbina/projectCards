import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ControlledTextField } from '../../../ui'

import s from './nickname-field.module.scss'
import { nicknameScheme } from './validation/nickname-scheme.ts'

type PropsType = {
  callBack: () => void
} & z.infer<typeof nicknameScheme>

export const EditName: FC<PropsType> = ({ callBack }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropsType>({
    resolver: zodResolver(nicknameScheme),
  })

  const onSubmit = (data: PropsType) => {
    alert(JSON.stringify(data))
    callBack()
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
