import { PaginatedEntity, Pagination } from '../types'

export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
  rating: number
  created: string
  updated: string
}

export type CardsResponse = PaginatedEntity<Card> & {
  maxCardsCount: number
}

export type GetCardsArgs = {
  deckId: string
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
  orderBy?: string | null
}

export type CreateCardArgs = Pick<
  Card,
  'question' | 'answer' | 'deckId' | 'answerImg' | 'questionImg'
>

export type UpdateCardArgs = Pick<Card, 'id' | 'question' | 'answer' | 'answerImg' | 'questionImg'>

export type DeleteCardArgs = {
  cardId: Card['id']
}
