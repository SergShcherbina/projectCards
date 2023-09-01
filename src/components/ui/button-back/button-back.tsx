import { useNavigate } from 'react-router-dom'

import { Button } from '../button'
import { Typography } from '../typography'

import s from './button-back.module.scss'
import ArrowBackIcon from './icons/ArrowBackIcon.tsx'

export const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button variant={'link'} onClick={() => navigate('/')} style={{ outline: 'none' }}>
        <Typography variant={'body2'} className={s.backLabel}>
          <ArrowBackIcon width={16} /> Back to Packs Lists
        </Typography>
      </Button>
    </>
  )
}
