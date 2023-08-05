import { FC, useState } from 'react'

import { Button, Card, Typography } from '../../ui'

import s from './edit-profile.module.scss'
import { EditName } from './nickname-field'
import { ReplaceAvatar } from './replace-avatar/replace-avatar.tsx'

type Props = {
  src?: string
  name: string
  email: string
  logoutHandler: () => void
}

export const EditProfile: FC<Props> = ({ name, src, email, logoutHandler }) => {
  let [switcher, setSwitcher] = useState(false)

  const toggleHandler = () => {
    setSwitcher(!switcher)
  }

  return (
    <Card className={s.offset}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>

      <ReplaceAvatar src={src} />

      {switcher ? (
        <EditName callBack={toggleHandler} nickname={name} />
      ) : (
        <>
          <Typography
            variant={'subtitle1'}
            as={'span'}
            className={s.nickname}
            onDoubleClick={toggleHandler}
          >
            {name}
          </Typography>
          <Typography variant={'body2'} as={'span'} className={s.email}>
            {email}
          </Typography>
          <Button variant={'secondaryWithIcon'} className={s.offsetBtn} onClick={logoutHandler}>
            {'Logout'}
          </Button>
        </>
      )}
    </Card>
  )
}
