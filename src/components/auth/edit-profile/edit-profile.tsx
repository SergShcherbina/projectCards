import { FC, useState } from 'react'

import { useLogoutMutation, useMeQuery, useUpdateMeMutation } from '../../../services/auth'
import { Button, Card, Typography } from '../../ui'

import s from './edit-profile.module.scss'
import { EditName } from './nickname-field'
import { ReplaceAvatar } from './replace-avatar/replace-avatar.tsx'

type Props = {
  src?: string
  email?: string
}

export const EditProfile: FC<Props> = ({}) => {
  let [switcher, setSwitcher] = useState(false)
  const { data } = useMeQuery()
  const [updateMe] = useUpdateMeMutation()
  const [onLogout] = useLogoutMutation()
  const onChangeNameHandler = (name: string) => {
    const form = new FormData()

    form.append('name', name)
    updateMe(form)
    setSwitcher(!switcher)
  }

  const onChangeAvatarHandler = (data: string | Blob) => {
    const form = new FormData()

    form.append('avatar', data ? data : '')
    updateMe(form)
  }

  return (
    <Card className={s.offset}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>

      <ReplaceAvatar src={data?.avatar} replaceAvatar={value => onChangeAvatarHandler(value)} />

      {switcher ? (
        <EditName
          nickname={data?.name ? data?.name : 'Name'}
          onReplaceName={value => onChangeNameHandler(value)}
        />
      ) : (
        <>
          <Typography
            variant={'subtitle1'}
            as={'span'}
            className={s.nickname}
            onClick={() => setSwitcher(!switcher)}
          >
            {data?.name}
          </Typography>
          <Typography variant={'body2'} as={'span'} className={s.email}>
            {data?.email}
          </Typography>
          <Button variant={'secondaryWithIcon'} className={s.offsetBtn} onClick={() => onLogout()}>
            {'Logout'}
          </Button>
        </>
      )}
    </Card>
  )
}
