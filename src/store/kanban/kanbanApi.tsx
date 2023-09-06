import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { replaceBoardsList, resetBoardsList } from './kanbanSlice';
import { BoardListTypes } from '../../interfaces';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-app-6c958-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  tagTypes: ['BOARDS'],
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: (userId: string) => ({
        url: `${userId}.json`,
        method: 'GET',
      }),
      providesTags: ['BOARDS'],

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(replaceBoardsList(data));
          toast.success('You successfully got user board');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    replaceAllBoards: builder.mutation({
      query: ({ userId, data }: { userId: string; data: BoardListTypes }) => ({
        url: `${userId}.json`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(replaceBoardsList(data));
          toast.success('You successfully replaced all board data');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addBoard: builder.mutation({
      query: ({ userId, data }: { userId: string; data: BoardListTypes }) => ({
        url: `${userId}.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARDS'],

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully added new board data');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteAllBoards: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `${userId}.json`,
        method: 'DELETE',
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetBoardsList());
          toast.success('You successfully deleted all board data');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteBoard: builder.mutation({
      query: ({ userId, boardId }: { userId: string; boardId: string }) => ({
        url: `${userId}/${boardId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully deleted all board data');
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetAllBoardsQuery, useAddBoardMutation, useDeleteBoardMutation } = kanbanApi;
