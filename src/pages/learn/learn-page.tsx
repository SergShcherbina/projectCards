import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { Spinner } from '../../assets'
import { Button, Card, Typography } from '../../components'
import { useGetDeckByIdQuery, useGetLearnQuery, useUpdateLearnMutation } from '../../services'

import { Answer } from './answer/answer.tsx'
import s from './learn-page.module.scss'
import { ZeroQuestion } from './zero-questions/zero-question.tsx'

export const LearnPage = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [show, setShow] = useState(false)
  const [prevId, setPrevId] = useState<string | undefined>()

  if (!deckId) return <Spinner />

  const { data: deck } = useGetDeckByIdQuery(deckId)
  const [update] = useUpdateLearnMutation()
  const { data: learnCard } = useGetLearnQuery({
    id: deckId,
    previousCardId: prevId,
  })

  if (!deck && !learnCard) return <Spinner />

  const updateQuestion = (value: string) => {
    // const formData = new FormData()
    // formData.append('cardId', data.items[0].id)
    // formData.append('grade', 'value')

    if (learnCard) {
      setPrevId(learnCard.id)
      update({ id: deckId, cardId: learnCard.id, grade: +value })
        .unwrap()
        .then(res => {
          console.log(res.id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <>
      {deck?.cardsCount === 0 ? (
        <ZeroQuestion />
      ) : (
        <div>
          <Card className={s.wrapperQuestion}>
            <Typography variant={'large'} className={s.title}>
              {deck?.name}
            </Typography>
            <Typography variant={'h2'} as={'div'}>
              Question:
            </Typography>
            <Typography variant={'body1'}>{learnCard?.question}</Typography>
            <Typography variant={'body2'} className={s.description}>
              {`Количество попыток ответа на вопрос ${learnCard?.shots}`}
            </Typography>
            <Button
              className={`${s.button} ${show ? s.hide : ''} `}
              variant={'primary'}
              fullWidth={true}
              onClick={() => setShow(true)}
            >
              Show Answer
            </Button>
          </Card>

          <Answer show={show} item={learnCard} setShow={setShow} updateQuestion={updateQuestion} />
        </div>
      )}
    </>
  )
}
