/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPostsAsync = createAsyncThunk(
  'posts/getPostsAsync',
  async () => {
    const resp = await fetch('http://localhost:8080/posts');
    if (resp.ok) {
      const posts = await resp.json();
      return { posts };
    }
  },
);

export const addTripAsync = createAsyncThunk(
  'posts/addTripAsync',
  async (payload) => {
    const resp = await fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: payload.destination,
        airfare: payload.airfare,
        lodging: payload.lodging,
        attractions: payload.attractions,
        food: payload.food,
      }),
    });

    if (resp.ok) {
      const post = await resp.json();
      return { post };
    }
  },
);

export const deleteTripAsync = createAsyncThunk(
  '/posts/deleteTripAsync',
  async (payload) => {
    const resp = await fetch(`http://localhost:8080/posts/${payload.id}`, {
      method: 'DELETE',
    });
    if (resp.ok) {
      return { id: payload.id };
    }
  },
);

export const editTripAsync = createAsyncThunk(
  'posts/editTripAsync',
  async (payload) => {
    const resp = await fetch(`http://localhost:8080/posts/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: payload.destination,
        airfare: payload.airfare,
        lodging: payload.lodging,
        food: payload.food,
        attractions: payload.attractions,
      }),
    });
    if (resp.ok) {
      const post = await resp.json();
      return { post };
    }
  },
);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    posts: [],
    displayedPost: {
      desination: '', airfare: 0, lodging: 0, food: 0, attractions: 0, transportation: 0,
    },
  },
  reducers: {
    addTrip: (state, action) => {
      const newTrip = {
        destination: action.payload.destination,
        airfare: action.payload.airfare,
        lodging: action.payload.lodging,
        food: action.payload.food,
        attractions: action.payload.attractions,
      };
      state.posts.push(newTrip);
      console.log(state.posts[0]);
    },
    displayedTrip: (state, action) => {
      const index = state.posts.findIndex((item) => item._id === action.payload.id);
      state.displayedPost = state.posts[index];
      console.log(state.displayedPost.destination);
    },
    editTrip: (state, action) => {
      const index = state.posts.findIndex((item) => item.id === action.payload.id);
      const postToEdit = state.posts[index];
      const editedTrip = {
        airfare: action.payload.airfare,
        lodging: action.payload.lodging,
        food: action.payload.food,
        attractions: action.payload.attractions,
      };
      postToEdit.airfare = editedTrip.airfare;
      postToEdit.lodging = editedTrip.lodging;
      postToEdit.food = editedTrip.food;
      postToEdit.attractions = editedTrip.attractions;
      state.posts.splice(index, 1, postToEdit);
      state.displayedPost = postToEdit;
      console.log(state.displayedPost.destination);
    },
    deleteTrip: (state, action) => {
      const newPosts = state.posts.filter((item) => item.id !== action.payload.id);
      state.posts = newPosts;
    },
  },
  extraReducers: {
    [getPostsAsync.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      console.log(state.posts);
    },
    [addTripAsync.fulfilled]: (state, action) => {
      state.posts.push(action.payload.post);
    },
    [editTripAsync.fulfilled]: (state, action) => {
      const index = state.posts.findIndex((item) => item._id === state.displayedPost._id);
      state.posts.splice(index, 1, action.payload.post);
      state.displayedPost = action.payload.post;
    },
    [deleteTripAsync.fulfilled]: (state, action) => {
      const newPosts = state.posts.filter((item) => item._id !== action.payload.id);
      state.posts = newPosts;
      state.displayedPost = {};
    },
  },
});

export const {
  addTrip, displayedTrip, deleteTrip, editTrip,
} = tripSlice.actions;
export default tripSlice.reducer;
