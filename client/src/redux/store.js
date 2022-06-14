import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './tripSlice';

export default configureStore({
  reducer: {
    trips: tripReducer,
  },
});
