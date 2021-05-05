import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../Slices/notesSlice'
import userReducer from '../Slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer
  },
});
