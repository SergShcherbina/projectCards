import { Button, Card, Typography } from '../../ui'

import s from './check-email.module.scss'
import iconCheckMail from './img/iconCheckMail.svg'

type Props = {
  email: string
}

export const CheckEmail = ({ email }: Props) => {
  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Check Email
      </Typography>
      <img src={iconCheckMail} className={s.img} />
      <Typography variant="body2" className={s.instructions}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        We've sent an e-mail with instructions to {email}
      </Typography>
      <Button type="submit" className={s.button} fullWidth={true}>
        Back to Sign In
      </Button>
    </Card>
  )
}
