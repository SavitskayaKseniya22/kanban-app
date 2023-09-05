import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import firebaseApp from '../../services/firebase';
import {
  SignInUpArgsTypes,
  ChangePasswordArgsTypes,
  ChangeEmailArgsTypes,
  AuthErrorTypes,
  ActiveUserListDataTypes,
} from '../../interfaces';
import { resetActiveUser, updateActiveUser } from './authSlice';

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
      query: ({ email, password }: SignInUpArgsTypes) => ({
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
      query: ({ email, password }: SignInUpArgsTypes) => ({
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
          toast.success("You've successfully logged in");
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
    getProfileData: builder.mutation({
      query: (idToken: string) => ({
        url: `:lookup?key=${apiKey}`,
        method: 'POST',
        body: {
          idToken,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      transformResponse: (response) => (response as ActiveUserListDataTypes).users[0],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success(t('auth.success.dataUploaded'));
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            dispatch(resetActiveUser());
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: ({ idToken, password }: ChangePasswordArgsTypes) => ({
        url: `:update?key=${apiKey}`,
        method: 'POST',
        body: {
          idToken,
          password,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetActiveUser());
          toast.success(t('auth.success.passwordChanged'));
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            if (message !== 'weak password : password should be at least 6 characters') {
              dispatch(resetActiveUser());
            }
          }
        }
      },
    }),
    changeEmail: builder.mutation({
      query: ({ idToken, email }: ChangeEmailArgsTypes) => ({
        url: `:update?key=${apiKey}`,
        method: 'POST',
        body: {
          idToken,
          email,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetActiveUser());
          toast.success(t('auth.success.emailChanged'));
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            if (message !== 'email exists') {
              dispatch(resetActiveUser());
            }
          }
        }
      },
    }),
    deleteProfile: builder.mutation({
      query: (idToken: string) => ({
        url: `:delete?key=${apiKey}`,
        method: 'POST',
        body: {
          idToken,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('auth.success.accountDeleted'));
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        } finally {
          dispatch(resetActiveUser());
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetProfileDataMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useDeleteProfileMutation,
} = authApi;