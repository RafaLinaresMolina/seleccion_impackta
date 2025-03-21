import { createAsyncThunk } from '@reduxjs/toolkit';
import pokemonActions, { Pokemon } from '../actions/Pokemon.actions';

export const fetchPokemons = createAsyncThunk(
    'pokemon/fetchPokemons',
    async ({ sort, limit }: { sort?: string; limit?: number }, { rejectWithValue }) => {
        try {
            const response = await pokemonActions.getAllPokemons(sort, limit);
            return response;
        } catch (err) {
            return rejectWithValue('Failed to load pokémon data. Please try again.');
        }
    }
);

export const createPokemon = createAsyncThunk(
    'pokemon/createPokemon',
    async (pokemon: Pokemon, { rejectWithValue }) => {
        try {
            const response = await pokemonActions.createPokemon(pokemon);
            return response;
        } catch (err) {
            return rejectWithValue('Failed to create pokémon. Please try again.');
        }
    }
);

export const clearPokemonState = () => ({
    type: 'pokemon/clearPokemonState'
});