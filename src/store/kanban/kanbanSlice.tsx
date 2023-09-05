/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardListTypes, BoardTypes, ColumnTypes } from '../../interfaces';

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

    addBoard: (state, action: PayloadAction<BoardTypes>) => {
      state.boards = Object.assign(state.boards, action.payload);
    },

    addColumn: (state, action: PayloadAction<{ data: ColumnTypes; boardId: string }>) => {
      state.boards[action.payload.boardId] = Object.assign(
        state.boards[action.payload.boardId],
        action.payload.data
      );
    },

    resetBoardsList: (state) => {
      state.boards = initialState.boards;
    },
  },
});

export const { addBoard, replaceBoardsList, resetBoardsList } = kanbanSlice.actions;

export default kanbanSlice.reducer;
