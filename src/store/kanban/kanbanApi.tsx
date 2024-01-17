import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import {
  BasicEntityInfo,
  BoardDataTypes,
  BoardId,
  BoardListTypes,
  BoardTypes,
  ColumnDataTypes,
  ColumnId,
  KanbanErrorTypes,
  TaskId,
  TokenId,
  UserId,
} from '../../interfaces';
import { resetActiveUser } from '../auth/authSlice';

function handleKanbanErr(
  err: KanbanErrorTypes | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, any, AnyAction>
) {
  if (err !== null && 'error' in err) {
    const { data, status } = err.error;
    toast.error(`${status}: ${data.error}`);
    dispatch(resetActiveUser());
  } else {
    toast.error(`Not specific error`);
  }
}

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-app-6c958-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  tagTypes: ['BOARDS', 'BOARD'],
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: ({ userId, idToken }: UserId & TokenId) => ({
        url: `${userId}.json`,
        method: 'GET',
        params: { auth: idToken },
      }),
      providesTags: ['BOARDS'],

      transformResponse: (response: BoardListTypes) =>
        response ? Object.keys(response).map((board) => response[board]) : [],

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
          dispatch(resetActiveUser());
        }
      },
    }),
    editAllBoard: builder.mutation({
      query: ({ ids, data }: { ids: UserId & BoardId & TokenId } & { data: BoardDataTypes }) => ({
        url: `${ids.userId}/${ids.boardId}/data/.json`,
        method: 'PUT',
        body: data,
        params: { auth: ids.idToken },
      }),
      async onQueryStarted(attr, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),

    getBoard: builder.query({
      query: ({ userId, boardId, idToken }: UserId & BoardId & TokenId) => ({
        url: `${userId}/${boardId}.json`,
        method: 'GET',
        params: { auth: idToken },
      }),
      providesTags: ['BOARD'],

      transformResponse: (response: BoardTypes) => {
        if (response === null) {
          throw new Error('No data found');
        }
        const { data } = response;
        return data
          ? Object.keys(data)
              .map((column) => data[column])
              .sort((a, b) => a.order - b.order)
          : [];
      },

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    addBoard: builder.mutation({
      query: ({ userId, data, idToken }: UserId & { data: BoardListTypes } & TokenId) => ({
        url: `${userId}.json`,
        method: 'PATCH',
        body: data,
        params: { auth: idToken },
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    editBoard: builder.mutation({
      query: ({
        ids,
        formData,
      }: { ids: UserId & BoardId & TokenId } & { formData: BasicEntityInfo }) => ({
        url: `${ids.userId}/${ids.boardId}.json`,
        method: 'PATCH',
        body: formData,
        params: { auth: ids.idToken },
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    deleteBoard: builder.mutation({
      query: ({ userId, boardId, idToken }: UserId & BoardId & TokenId) => ({
        url: `${userId}/${boardId}.json`,
        method: 'DELETE',
        params: { auth: idToken },
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(attr, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),

    addColumn: builder.mutation({
      query: ({ ids, data }: { ids: UserId & BoardId & TokenId } & { data: BoardDataTypes }) => ({
        url: `${ids.userId}/${ids.boardId}/data/.json`,
        method: 'PATCH',
        body: data,
        params: { auth: ids.idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    editColumn: builder.mutation({
      query: ({
        ids,
        formData,
      }: {
        ids: UserId & BoardId & ColumnId & TokenId;
      } & { formData: BasicEntityInfo }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}.json`,
        method: 'PATCH',
        body: formData,
        params: { auth: ids.idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    deleteColumn: builder.mutation({
      query: ({ userId, boardId, columnId, idToken }: UserId & BoardId & ColumnId & TokenId) => ({
        url: `${userId}/${boardId}/data/${columnId}.json`,
        method: 'DELETE',
        params: { auth: idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    addTask: builder.mutation({
      query: ({
        ids,
        data,
      }: {
        ids: UserId & BoardId & ColumnId & TokenId;
      } & { data: ColumnDataTypes }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}/data/.json`,
        method: 'PATCH',
        body: data,
        params: { auth: ids.idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    editTask: builder.mutation({
      query: ({
        ids,
        formData,
      }: { ids: UserId & BoardId & ColumnId & TaskId & TokenId } & {
        formData: BasicEntityInfo;
      }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}/data/${ids.taskId}.json`,
        method: 'PATCH',
        body: formData,
        params: { auth: ids.idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: ({
        userId,
        boardId,
        columnId,
        taskId,
        idToken,
      }: UserId & BoardId & ColumnId & TaskId & TokenId) => ({
        url: `${userId}/${boardId}/data/${columnId}/data/${taskId}.json`,
        method: 'DELETE',
        params: { auth: idToken },
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes, dispatch);
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
  useEditTaskMutation,
  useAddColumnMutation,
  useGetBoardQuery,
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useEditAllBoardMutation,
  useEditColumnMutation,
  useEditBoardMutation,
} = kanbanApi;
