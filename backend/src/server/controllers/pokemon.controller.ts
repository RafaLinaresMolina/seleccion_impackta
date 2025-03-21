import Pokemon from "../database/models/pokemon";
import tryCatch from "../../utils/tryCatch";
import { Request, Response } from "express";
import { FindOptions, Order } from "sequelize";
import pokemonRepository from "../database/repositories/pokemon.repository";
import { PokemonDto } from "../models/Pokemon.dto";
export const getAllPokemons = async (req: Request, res: Response) => {
  let options: FindOptions = {};
  if (req.query) {
    console.log("request has query params");
    const sortFields = (req.query.sort as string) || "name";
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const validFields = Object.keys(Pokemon.getAttributes());

    const sortItems = sortFields.split(",");
    const orderingRules: Order = [];
    const invalidFields: string[] = [];

    for (const item of sortItems) {
      const [fieldName, fieldOrder = "asc"] = item.split(":");

      if (!validFields.includes(fieldName)) {
        invalidFields.push(fieldName);
        continue;
      }

      const direction = fieldOrder.toLowerCase() === "desc" ? "desc" : "asc";
      orderingRules.push([fieldName, direction]);
    }

    if (invalidFields.length > 0) {
      const msg = `sort fields not valid: ${invalidFields.join(
        ", "
      )}. Please use: ${validFields.join(", ")}`;
      console.error(msg);
      return res.status(400).json({
        message: msg,
      });
    }

    options = {
      order: orderingRules,
    };

    if (limit) options.limit = limit;

    console.log("options to be used", { options });
  }

  const { data: pokemons, error } = await tryCatch(
    pokemonRepository.findAll(options ? options : {})
  );

  if (error) {
    const msg = `An error happened obtaining pokemons from database`;
    console.error(msg, { error });
    return res.status(500).json({
      message: msg,
      error: error,
    });
  }

  console.log({ pokemons });
  return res.status(200).json({
    count: pokemons.length,
    data: pokemons,
  });
};

export const createPokemon = async (body: PokemonDto, res: Response) => {
  const {data: newPokemon, error} = await tryCatch(pokemonRepository.create(body))

  if (error){
    const msg = `the following pokemon was unable to be created: ${body}`;
    console.error(msg, {error})
    return res.status(500).json({
      message: msg,
      error: error,
    });
  }

  console.log(`New pokemon ${newPokemon.name} added!`);
  return newPokemon;
}
