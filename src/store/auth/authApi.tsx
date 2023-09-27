import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import firebaseApp from '../../services/firebase';
import { AuthTypes, AuthErrorTypes } from '../../interfaces';
import { updateLoginTime, updateActiveUser } from './authSlice';

export function transformAuthError(response: FetchBaseQueryError) {
  const { message } = (response.data as AuthErrorTypes).error;
  return {
    code: response.status,
    message: message.toLowerCase().replaceAll('_', ' '),
  };
}

const { apiKey } = firebaseApp.options;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }: AuthTypes) => ({
        url: `:signUp?key=${apiKey}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You are registered successfully');
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
    signIn: builder.mutation({
      query: ({ email, password }: AuthTypes) => ({
        url: `:signInWithPassword?key=${apiKey}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateActiveUser(data));
          dispatch(updateLoginTime('mark'));
          toast.success("You've successfully logged in");
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
