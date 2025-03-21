import express from "express";
import { getAllPokemons, createPokemon } from "../controllers/pokemon.controller";
import { validateDto } from "../middleware/validateDto";
import { PokemonDto } from "../models/Pokemon.dto";
import tryCatch from "../../utils/tryCatch";

const pokemonRouter = express.Router();

// pokemon?sort=weight:desc&limit=25
pokemonRouter.get("/", getAllPokemons);

pokemonRouter.post('/', validateDto(PokemonDto), async (req, res, next) => {
      const {data: newPokemon, error} = await tryCatch(createPokemon(req.body, res));
      if (error){
        next(error)
      }
      res.status(201).json(newPokemon);
  });

export default pokemonRouter;
