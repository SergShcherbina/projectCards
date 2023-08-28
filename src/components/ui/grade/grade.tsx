import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './grade.module.scss'
import StarIcon from './icons/StarIcon.tsx'
import StarOutlineIcon from './icons/StarOutlineIcon.tsx'

type GradeProps = {
  grade: number
}
export const Grade: FC<GradeProps> = ({ grade = 0 }) => {
  const stars = [...Array(grade).fill(<StarIcon />), ...Array(5 - grade).fill(<StarOutlineIcon />)]

  return (
    <div className={s.stars}>
      {stars.map((star, id) => {
        return (
          <button key={id} onClick={() => alert(1 + id)}>
            <GradeItem key={id} starType={star} />
          </button>
        )
      })}
    </div>
  )
}

type GradeItemProps = {
  starType: ReactNode
  className?: string
}
export const GradeItem: FC<GradeItemProps> = ({ className, starType }) => {
  const style = clsx(s.gradeItem, className)

  return <div className={style}>{starType}</div>
}
