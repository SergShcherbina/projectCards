import { PaginatedEntity, Pagination } from '../types'

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
}

export type FormDataType = FormData
export type PatchDeckArgs = { decksId: string } & FormDataType

export interface Author {
  id: string
  name: string
}

export interface Deck {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted?: boolean
  isBlocked?: boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}
