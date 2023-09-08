import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { replaceBoardsList, resetBoardsList } from './kanbanSlice';
import { BoardDataTypes, BoardListTypes, BoardTypes, ColumnDataTypes } from '../../interfaces';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-app-6c958-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  tagTypes: ['BOARDS', 'BOARD'],
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
    getBoard: builder.query({
      query: ({ userId, boardId }: { userId: string; boardId: string }) => ({
        url: `${userId}/${boardId}.json`,
        method: 'GET',
      }),
      providesTags: ['BOARD'],

      transformResponse: (response: BoardTypes) => {
        if (!response.data) {
          return [];
        }
        const { data } = response;
        return Object.keys(data)
          .map((column) => data[column])
          .sort((a, b) => a.order - b.order);
      },

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully got user board');
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
    addColumn: builder.mutation({
      query: ({
        userId,
        boardId,
        data,
      }: {
        userId: string;
        boardId: string;
        data: BoardDataTypes;
      }) => ({
        url: `${userId}/${boardId}/data/.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARD'],

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully added new column');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteColumn: builder.mutation({
      query: ({
        userId,
        boardId,
        columnId,
      }: {
        userId: string;
        boardId: string;
        columnId: string;
      }) => ({
        url: `${userId}/${boardId}/data/${columnId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully deleted column');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addTask: builder.mutation({
      query: ({
        userId,
        boardId,
        columnId,
        data,
      }: {
        userId: string;
        boardId: string;
        columnId: string;
        data: ColumnDataTypes;
      }) => ({
        url: `${userId}/${boardId}/data/${columnId}/data/.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARD'],

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully added new task');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: ({
        userId,
        boardId,
        columnId,
        taskId,
      }: {
        userId: string;
        boardId: string;
        columnId: string;
        taskId: string;
      }) => ({
        url: `${userId}/${boardId}/data/${columnId}/data/${taskId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully deleted column');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    replaceColumnContent: builder.mutation({
      query: ({
        userId,
        boardId,
        columnId,
        data,
      }: {
        userId: string;
        boardId: string;
        columnId: string;
        data: ColumnDataTypes;
      }) => ({
        url: `${userId}/${boardId}/data/${columnId}/data/.json`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully refreshed column');
        } catch (err) {
          console.log(err);
        }
      },
    }),
    replaceBoardContent: builder.mutation({
      query: ({
        userId,
        boardId,
        data,
      }: {
        userId: string;
        boardId: string;
        data: BoardDataTypes;
      }) => ({
        url: `${userId}/${boardId}/data/.json`,
        method: 'PUT',
        body: data,
      }),

      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You successfully refreshed board');
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useAddBoardMutation,
  useDeleteBoardMutation,
  useAddTaskMutation,
  useAddColumnMutation,
  useGetBoardQuery,
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useReplaceColumnContentMutation,
  useReplaceBoardContentMutation,
} = kanbanApi;
