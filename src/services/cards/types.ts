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
  deskId: Card['deckId']
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
  orderBy?: string
}

export type CreateCardArgs = Pick<Card, 'question' | 'answer' | 'deckId'>

export type DeleteCardArgs = {
  id: Card['id']
}
