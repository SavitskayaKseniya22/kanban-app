import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { replaceBoardsList } from './kanbanSlice';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-app-6c958-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: (userId: string) => ({
        url: `${userId}.json`,
        method: 'GET',
      }),

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
  }),
});

export const { useGetAllBoardsQuery } = kanbanApi;
