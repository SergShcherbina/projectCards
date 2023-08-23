import { PropsWithChildren } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'

type Props = PropsWithChildren<{
  flex?: boolean
}>
export const Page = ({ children, flex = false }: Props) => {
  return <div className={clsx(s.content, flex && s.flex)}>{children}</div>
}
