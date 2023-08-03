import { FC, useState } from 'react'

import { Avatar, Button, Card, Typography } from '../../ui'

import s from './edit-profile.module.scss'
import { EditName } from './nickname-field'

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
    <Card>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>
      <Avatar src={src} size={96} className={s.avatarEdit} />
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
          <Button variant={'secondary'} className={s.offsetBtn} onClick={logoutHandler}>
            {'Logout'}
          </Button>
        </>
      )}
    </Card>
  )
}
