import { baseApi } from '../base-api.tsx'

import { Card, CardsResponse, CreateDecksArgs, GetCardsArgs } from './types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetCardsArgs>({
        query: args => {
          return {
            url: `v1/cards/{id}`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Cards'],
      }),
      patchCards: builder.mutation<Card, CreateDecksArgs>({
        query: ({ name }) => {
          return {
            url: `v1/cards/{id}`,
            method: 'PATCH',
            body: { name },
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCards: builder.mutation<any, DeleteCardArgs>({
        query: ({ name }) => {
          return {
            url: `v1/cards/{id}`,
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
  usePatchCardsMutation,
  useDeleteCardsMutation,
} = cardsApi
