/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardListTypes } from '../../interfaces';

export interface KanbanState {
  boards: BoardListTypes;
}

const initialState: KanbanState = {
  boards: {},
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    replaceBoardsList: (state, action: PayloadAction<BoardListTypes>) => {
      state.boards = action.payload;
    },

    resetBoardsList: (state) => {
      state.boards = initialState.boards;
    },
  },
});

export const { replaceBoardsList, resetBoardsList } = kanbanSlice.actions;

export default kanbanSlice.reducer;
