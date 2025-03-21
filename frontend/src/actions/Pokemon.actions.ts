import axios from 'axios';

export interface Pokemon {
  id?: number;
  name: string;
  height: number;
  number: number;
  health: number;
  weight: number;
  url: string;
}

export interface PokemonResponse {
  count: number;
  data: Pokemon[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7768',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pokemonActions = {

  getAllPokemons: async (sort?: string, limit?: number): Promise<PokemonResponse> => {
    let uri = '/pokemon';
    const params = new URLSearchParams();
    
    if (sort) params.append('sort', sort);
    if (limit) params.append('limit', limit.toString());
    
    if (params.toString()) {
      uri += `?${params.toString()}`;
    }
    
    const response = await api.get<PokemonResponse>(uri);
    return response.data;
  },
  
  createPokemon: async (pokemon: Pokemon): Promise<Pokemon> => {
    const response = await api.post<Pokemon>('/pokemon', pokemon);
    return response.data;
  }
};

export default pokemonActions;