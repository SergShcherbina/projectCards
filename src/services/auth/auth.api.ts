import { baseApi } from '../base-api.tsx'

import { requestSignUp, UserType } from './types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<UserType | null, void>({
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
      logout: builder.mutation<void, void>({
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

      signUp: builder.mutation<UserType, requestSignUp>({
        query: body => {
          return {
            url: `v1/auth/sign-up`,
            method: 'POST',
            body,
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useLogoutMutation, useSignUpMutation } = authApi