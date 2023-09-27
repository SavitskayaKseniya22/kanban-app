import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
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
  UserId,
} from '../../interfaces';

function handleKanbanErr(err: KanbanErrorTypes | null) {
  if (err !== null && 'data' in err) {
    const { data, originalStatus } = err.error;
    toast.error(`${originalStatus}: ${data[0].toUpperCase()}${data.slice(1)}`);
  } else {
    toast.error(`${404}: No data`);
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
      query: ({ userId }: UserId) => ({
        url: `${userId}.json`,
        method: 'GET',
      }),
      providesTags: ['BOARDS'],

      transformResponse: (response: BoardListTypes) =>
        response ? Object.keys(response).map((board) => response[board]) : [],

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    editAllBoard: builder.mutation({
      query: ({ userId, boardId, data }: UserId & BoardId & { data: BoardDataTypes }) => ({
        url: `${userId}/${boardId}/data/.json`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),

    getBoard: builder.query({
      query: ({ userId, boardId }: UserId & BoardId) => ({
        url: `${userId}/${boardId}.json`,
        method: 'GET',
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

      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    addBoard: builder.mutation({
      query: ({ userId, data }: UserId & { data: BoardListTypes }) => ({
        url: `${userId}.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully added a new board');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    editBoard: builder.mutation({
      query: ({ ids, formData }: { ids: UserId & BoardId } & { formData: BasicEntityInfo }) => ({
        url: `${ids.userId}/${ids.boardId}.json`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully edited the board');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    deleteBoard: builder.mutation({
      query: ({ userId, boardId }: UserId & BoardId) => ({
        url: `${userId}/${boardId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARDS'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully deleted all boards');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),

    addColumn: builder.mutation({
      query: ({ ids, data }: { ids: UserId & BoardId } & { data: BoardDataTypes }) => ({
        url: `${ids.userId}/${ids.boardId}/data/.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully added a new column');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    editColumn: builder.mutation({
      query: ({
        ids,
        formData,
      }: { ids: UserId & BoardId & ColumnId } & { formData: BasicEntityInfo }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}.json`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully edited the column');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    deleteColumn: builder.mutation({
      query: ({ userId, boardId, columnId }: UserId & BoardId & ColumnId) => ({
        url: `${userId}/${boardId}/data/${columnId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully deleted the column');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    addTask: builder.mutation({
      query: ({ ids, data }: { ids: UserId & BoardId & ColumnId } & { data: ColumnDataTypes }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}/data/.json`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully added a new task');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    editTask: builder.mutation({
      query: ({
        ids,
        formData,
      }: { ids: UserId & BoardId & ColumnId & TaskId } & {
        formData: BasicEntityInfo;
      }) => ({
        url: `${ids.userId}/${ids.boardId}/data/${ids.columnId}/data/${ids.taskId}.json`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully edited the task');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
        }
      },
    }),
    deleteTask: builder.mutation({
      query: ({ userId, boardId, columnId, taskId }: UserId & BoardId & ColumnId & TaskId) => ({
        url: `${userId}/${boardId}/data/${columnId}/data/${taskId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOARD'],
      async onQueryStarted(attr, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You have successfully deleted the column');
        } catch (err) {
          handleKanbanErr(err as KanbanErrorTypes);
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
