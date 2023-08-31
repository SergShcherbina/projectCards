import { PropsWithChildren } from 'react'

import { clsx } from 'clsx'

import { useLogoutMutation, useMeQuery } from '../../../services/auth'
import { Header } from '../header'

import s from './page.module.scss'

type Props = PropsWithChildren<{
  flex?: boolean
}>

export const Page = ({ children, flex = false }: Props) => {
  const { data } = useMeQuery()
  const [onLogout] = useLogoutMutation()

  return (
    <>
      <Header userData={data} onLogout={onLogout} />
      <div className={clsx(s.content, flex && s.flex)}>{children}</div>
    </>
  )
}
