import { baseApi } from '../base-api.tsx'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, void>({
        query: () => {
          return {
            url: `v1/decks`,
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery } = decksApi

export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

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

export interface DecksResponse {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}
