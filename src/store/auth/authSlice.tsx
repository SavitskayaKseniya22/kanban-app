/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActiveUserTypes } from '../../interfaces';

export interface ColumnTypes {
  id: string;
  name: string;
  strings: { id: string; value: string }[];
}

export interface AuthState {
  activeUser: ActiveUserTypes | undefined;
  userData: ColumnTypes[];
}

const initialState: AuthState = {
  activeUser: undefined,
  userData: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateActiveUser: (state, action: PayloadAction<ActiveUserTypes>) => {
      state.activeUser = action.payload;
    },

    updateUserData: (state, action: PayloadAction<ColumnTypes>) => {
      state.userData = [...state.userData, action.payload];
    },
    resetActiveUser: (state) => {
      state.activeUser = initialState.activeUser;
    },
  },
});

export const { updateActiveUser, resetActiveUser, updateUserData } = authSlice.actions;

export default authSlice.reducer;
