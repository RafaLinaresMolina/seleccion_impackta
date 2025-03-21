import { FindOptions } from "sequelize";
import { PokemonDto } from "../../models/Pokemon.dto";
import Pokemon from "../models/pokemon";
import { plainToInstance } from "class-transformer";
import tryCatch from "../../../utils/tryCatch";

class PokemonRepository {
  async findAll(options: FindOptions<PokemonDto> = {}): Promise<PokemonDto[]> {
    const { data: payload, error } = await tryCatch(Pokemon.findAll(options));

    if (error) {
      console.error("Error in PokemonRepository.findAll:", error);
      throw error;
    }

    const plainPokemon = payload.map((pokemon) => pokemon.get({ plain: true }));
    const pokemon = plainToInstance(PokemonDto, plainPokemon, {
      excludeExtraneousValues: true,
    });
    return pokemon;
  }

  async create(pokemonData: PokemonDto): Promise<PokemonDto> {
    const { data: rawPokemon, error } = await tryCatch(
      Pokemon.create({
        name: pokemonData.name,
        height: pokemonData.height,
        number: pokemonData.number,
        health: pokemonData.health,
        weight: pokemonData.weight,
        url: pokemonData.url,
      })
    );

    if (error) {
      console.error("Error in PokemonRepository.create:", error);
      throw error;
    }

    console.log(rawPokemon);
    const newPokemon = rawPokemon?.get({ plain: true });
    const pokemon = plainToInstance(
      PokemonDto,
      newPokemon
    );
    console.log(pokemon);
    return pokemon;
  }
}

export default new PokemonRepository();
