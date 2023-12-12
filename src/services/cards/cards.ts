import { baseApi } from '../base-api.tsx'

import { Card, CardsResponse, DeleteCardArgs, GetCardsArgs } from './types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetCardsArgs>({
        query: ({ deckId, ...params }) => {
          return {
            url: `v1/decks/${deckId}/cards`,
            method: 'GET',
            params: params,
          }
        },
        providesTags: ['Cards'],
      }),
      createCards: builder.mutation<Card, { deckId: string; data: FormData }>({
        query: ({ deckId, data }) => {
          return {
            url: `v1/decks/${deckId}/cards`,
            method: 'POST',
            body: data,
          }
        },

        invalidatesTags: ['Cards'],
      }),
      updateCards: builder.mutation<Card, { id: string; data: FormData }>({
        query: ({ id, data }) => {
          return {
            url: `v1/cards/${id}/`,
            method: 'PATCH',
            body: data,
          }
        },

        invalidatesTags: ['Cards'],
      }),
      deleteCards: builder.mutation<any, DeleteCardArgs>({
        query: ({ cardId }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useLazyGetCardsQuery,
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useUpdateCardsMutation,
} = cardsApi
