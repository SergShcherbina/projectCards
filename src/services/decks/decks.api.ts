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
      createDeck: builder.mutation<Deck, CreateDecksArgs>({
        query: body => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery, useCreateDeckMutation } = decksApi
