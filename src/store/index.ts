import { configureStore } from '@reduxjs/toolkit';
import generationReducer from './slices/generationSlice';

export const store = configureStore({
  reducer: {
    generation: generationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
