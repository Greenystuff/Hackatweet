
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    firstname: '',
    username: '',
    likedTweets: [],
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
    setLikedTweet: (state, action) => {
      state.value.likedTweets = action.payload;
    },
    addLikedTweet: (state, action) => {
      state.value.likedTweets.push(action.payload);
    },
    removeLikedTweet: (state, action) => {
      state.value.likedTweets = state.value.likedTweets.filter(id => id !== action.payload)
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

export const { addUserToStore, setLikedTweet, addLikedTweet, removeLikedTweet, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;