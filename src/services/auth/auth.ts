import { baseApi } from '../base-api.tsx'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<any, void>({
        query: () => {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<any, any>({
        query: args => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            params: args,
          }
        },
        invalidatesTags: ['Me'],
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: `v1/auth/logout`,
            method: 'POST',
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authApi
