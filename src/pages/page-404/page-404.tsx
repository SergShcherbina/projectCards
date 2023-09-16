import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button, Typography } from '../../components'

import SVG from './img/SVG404.tsx'

export const Page404: FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10% auto',
      }}
    >
      <SVG />

      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={'a'} href={'/'} variant={'primary'} onClick={() => navigate('/')}>
        Back to home page
      </Button>
    </div>
  )
}
