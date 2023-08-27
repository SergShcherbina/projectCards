import { baseApi } from '../base-api.tsx'

import { Card, CardsResponse, CreateCardArgs, DeleteCardArgs, GetCardsArgs } from './types.ts'

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
      createCards: builder.mutation<Card, CreateCardArgs>({
        query: ({ deckId, ...body }) => {
          return {
            url: `v1/decks/${deckId}/cards`,
            method: 'POST',
            body,
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
} = cardsApi
