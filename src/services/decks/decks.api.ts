import { baseApi } from '../base-api.tsx'

import {
  ArgsUpdateType,
  Deck,
  DecksResponse,
  FormDataType,
  GetDecksArgs,
  learnDeckType,
  PatchDeckResponse,
  ResponseUpdateLearnType,
} from './types'

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

      getDeckById: builder.query<Deck, string>({
        query: deckId => `v1/decks/${deckId}`,
      }),

      createDeck: builder.mutation<Deck, FormDataType>({
        query: body => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Decks'],
      }),

      deleteDeck: builder.mutation<Deck, string>({
        query: deckId => {
          return {
            url: `v1/decks/${deckId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Decks'],
      }),

      editDeck: builder.mutation<PatchDeckResponse, any>({
        query: ({ formData, decksId }) => {
          return {
            url: `v1/decks/${decksId}`,
            method: 'PATCH',
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
      }),

      getLearn: builder.query<learnDeckType, { id: string; previousCardId?: string }>({
        query: ({ id, previousCardId }) => {
          return {
            url: `v1/decks/${id}/learn`,
            method: 'GET',
            params: { previousCardId },
          }
        },
      }),
      updateLearn: builder.mutation<ResponseUpdateLearnType, ArgsUpdateType>({
        query: ({ id, cardId, grade }) => {
          return {
            url: `v1/decks/${id}/learn`,
            method: 'POST',
            body: { cardId, grade },
          }
        },
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  // useLazyGetDecksQuery,
  useUpdateLearnMutation,
  useCreateDeckMutation,
  useGetDeckByIdQuery,
  useDeleteDeckMutation,
  useEditDeckMutation,
  useGetLearnQuery,
} = decksApi
