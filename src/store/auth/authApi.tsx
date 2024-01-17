import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import firebaseApp from '../../services/firebase';
import { AuthTypes, AuthErrorTypes } from '../../interfaces';
import { updateLoginTime, updateActiveUser } from './authSlice';
import i18n from '../../i18n';

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
          toast.success(i18n.t('toast.registered'));
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
          toast.success(i18n.t('toast.logged'));
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
