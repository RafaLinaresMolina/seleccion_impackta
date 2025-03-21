import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon, PokemonResponse } from '../actions/Pokemon.actions';
import { fetchPokemons, createPokemon } from './pokemonActions.redux';

interface PokemonState {
    pokemons: Pokemon[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    totalCount: number;
}

const initialState: PokemonState = {
    pokemons: [],
    status: 'idle',
    error: null,
    totalCount: 0,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        clearPokemonState: (state) => {
            state.pokemons = [];
            state.status = 'idle';
            state.error = null;
            state.totalCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<PokemonResponse>) => {
                state.status = 'succeeded';
                state.pokemons = action.payload.data;
                state.totalCount = action.payload.count;
                state.error = null;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(createPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
                state.pokemons.push(action.payload);
                state.totalCount += 1;
            });
    },
});

export const { clearPokemonState } = pokemonSlice.actions;

export default pokemonSlice.reducer;