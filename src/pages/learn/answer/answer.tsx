import { FC, useState } from 'react'

import { Button, Card, Typography } from '../../../components'
import { RadioGroup } from '../../../components/ui/radio-group'
import { learnDeckType } from '../../../services'

import s from './answer.module.scss'

type Props = {
  item?: learnDeckType
  show: boolean
  setShow: (show: boolean) => void
  updateQuestion: (value: string) => void
}

export const Answer: FC<Props> = ({ show, item, setShow, updateQuestion }) => {
  const [value, setValue] = useState('1')

  const handleClick = () => {
    updateQuestion(value)
    setShow(false)
  }

  const onValueChange = (value: string) => {
    setValue(value)
  }

  return (
    <Card className={`${s.answer} ${show ? s.show : ''}`}>
      <Typography variant={'h2'}>Answer:</Typography>
      <Typography variant={'body1'}>{item?.answer}</Typography>
      <RadioGroup
        name={'Rate yourself: '}
        defaultValue={'1'}
        onValueChange={onValueChange}
        value={value}
        options={[
          { label: 'Did not know', value: '1' },
          { label: 'Forgot', value: '2' },
          { label: 'A lot of thought', value: '3' },
          { label: 'Сonfused', value: '4' },
          { label: 'Knew the answer', value: '5' },
        ]}
      ></RadioGroup>
      <Button
        className={s.button}
        type={'submit'}
        variant={'primary'}
        fullWidth={true}
        onClick={handleClick}
      >
        Next Question
      </Button>
    </Card>
  )
}
