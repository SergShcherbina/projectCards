import { FC, useState } from 'react'

import { useMeQuery, useUpdateMeMutation } from '../../../services/auth/auth.api.ts'
import { Button, Card, Typography } from '../../ui'

import s from './edit-profile.module.scss'
import { EditName } from './nickname-field'
import { ReplaceAvatar } from './replace-avatar/replace-avatar.tsx'

type Props = {
  src?: string
  name: string
  email?: string
  logoutHandler?: () => void
  replaceAvatar?: (data: Blob | MediaSource) => void
}

export const EditProfile: FC<Props> = ({
  name,
  src,
  logoutHandler,
  // replaceNickname,
  replaceAvatar,
}) => {
  let [switcher, setSwitcher] = useState(false)
  const { data } = useMeQuery()
  const [updateMe] = useUpdateMeMutation()
  const onReplaceName = (name: string | undefined) => {
    const form = new FormData()

    form.append('name', name ? name : '')
    updateMe(form)
    setSwitcher(!switcher)
  }

  return (
    <Card className={s.offset}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>

      <ReplaceAvatar src={src} replaceAvatar={replaceAvatar} />

      {switcher ? (
        <EditName nickname={name} onReplaceName={value => onReplaceName(value)} />
      ) : (
        <>
          <Typography
            variant={'subtitle1'}
            as={'span'}
            className={s.nickname}
            onDoubleClick={() => setSwitcher(!switcher)}
          >
            {data?.name}
          </Typography>
          <Typography variant={'body2'} as={'span'} className={s.email}>
            {data?.email}
          </Typography>
          <Button variant={'secondaryWithIcon'} className={s.offsetBtn} onClick={logoutHandler}>
            {'Logout'}
          </Button>
        </>
      )}
    </Card>
  )
}
