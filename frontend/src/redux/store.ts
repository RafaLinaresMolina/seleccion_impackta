import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../reducer/pokemonReducer.ts';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;