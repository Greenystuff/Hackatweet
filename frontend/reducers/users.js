
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    firstname: '',
    username: '',
    token: ''
  },
};

export const usersSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.username = action.payload.username;
      state.value.token = action.payload.token;
    },
    deleteUser: (state) => {
      state.value = {
        firstname: '',
        username: '',
        token: ''
      }
    },
  },
});

export const { addUserToStore, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;