import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from './base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me', 'Cards'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
