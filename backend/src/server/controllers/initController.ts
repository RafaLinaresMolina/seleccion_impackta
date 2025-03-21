import Pokemon from "../database/models/pokemon";
const init =  async () => {
  try {
    const pokemonAuxArray = [];
    for (let i = 1; i <= 152; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();

      const pokemon = {
        name: data.name,
        url: data.sprites.other["official-artwork"].front_default,
        weight: data.weight,
        height: data.height,
        number: data.order,
        health: data.stats[0].base_stat,
      }

      await Pokemon.create(pokemon);
    }
  } catch (error) {
    console.log(error);
  }
};

export default init;
