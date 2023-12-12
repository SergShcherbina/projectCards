import { FC, useState, MouseEvent } from 'react'

import { Button, Card, Typography } from '../../ui'

import { EditNikname } from './edit-nikname'
import s from './edit-profile.module.scss'
import { ReplaceAvatar } from './replace-avatar/replace-avatar.tsx'

type Props = {
  src?: string
  name: string
  email: string
  logoutHandler: () => void
  replaceAvatar: (image: string | Blob) => void
  replaceName: (userName: string) => void
}

export const EditProfile: FC<Props> = ({
  name,
  src,
  email,
  logoutHandler,
  replaceAvatar,
  replaceName,
}) => {
  let [switcher, setSwitcher] = useState(false)

  const openEditName = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setSwitcher(true)
  }
  const closeEditMode = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && switcher) {
      setSwitcher(false)
    }
  }
  const onEditName = (userName: string) => {
    replaceName(userName)
    setSwitcher(false)
  }

  return (
    <Card onClick={e => closeEditMode(e)}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>
      <ReplaceAvatar replaceAvatar={replaceAvatar} src={src} />
      {switcher ? (
        <EditNikname nickname={name} onEditName={onEditName} />
      ) : (
        <>
          <Typography
            variant={'subtitle1'}
            as={'span'}
            className={s.nickname}
            onClick={e => openEditName(e)}
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
