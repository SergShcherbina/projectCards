import { baseApi } from '../base-api.tsx'

import { CreateDecksArgs, Deck, DecksResponse, GetDecksArgs } from './types'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDecks: builder.mutation<Deck, CreateDecksArgs>({
        query: ({ name }) => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery, useCreateDecksMutation } = decksApi
