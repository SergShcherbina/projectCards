import { PropsWithChildren } from 'react'

import { clsx } from 'clsx'

import { Header } from '../header'

import s from './page.module.scss'

type Props = PropsWithChildren<{
  flex?: boolean
}>

export const Page = ({ children, flex = false }: Props) => {
  return (
    <>
      <Header isAuth={false} userName={'name'} />
      <div className={clsx(s.content, flex && s.flex)}>{children}</div>
    </>
  )
}
