import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User, UserState } from '../types';

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
