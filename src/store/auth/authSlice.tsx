/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActiveUserTypes } from '../../interfaces';

export interface AuthState {
  activeUser: ActiveUserTypes | undefined;
  loginTime: number | undefined;
}

const initialState: AuthState = {
  activeUser: undefined,
  loginTime: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateActiveUser: (state, action: PayloadAction<ActiveUserTypes>) => {
      state.activeUser = action.payload;
    },

    updateLoginTime: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload === 'mark') {
        state.loginTime = Date.now();
      } else {
        state.loginTime = initialState.loginTime;
      }
    },

    resetActiveUser: (state) => {
      state.activeUser = initialState.activeUser;
      state.loginTime = initialState.loginTime;
    },
  },
});

export const { updateActiveUser, resetActiveUser, updateLoginTime } = authSlice.actions;

export default authSlice.reducer;
