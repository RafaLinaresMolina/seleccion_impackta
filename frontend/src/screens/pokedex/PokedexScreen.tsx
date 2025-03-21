import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PokedexScreenWrapper from './pokedexScreen.style';
import { fetchPokemons } from '../../reducer/pokemonActions.redux';
import FormModal from './FormModal';


const PokedexScreen = () => {
    const dispatch = useAppDispatch();
    const { pokemons, status, error } = useAppSelector((state) => state.pokemon);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemons({ sort: 'weight:desc', limit: 25 }));
        }
    }, [dispatch, status]);

    const loading = status === 'loading';

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <PokedexScreenWrapper>
            <div className="actions_container">
                <img
                    src="/assets/images/add_btn.png"
                    className="action_img"
                    alt="Add Pokémon"
                    onClick={openModal}
                />
            </div>

            <div className="title_section">
                <h2>Pokédex de Impackta</h2>
            </div>

            <div className="pokedex_container">
                {loading ? (
                    <p>Loading Pokémons...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        {pokemons.length > 0 ? (
                            pokemons.map((pokemon) => (
                                <div key={pokemon.id || pokemon.number} className="pokemon_card">
                                    <img
                                        src={pokemon.url}
                                        alt={pokemon.name}
                                        className="pokemon_image"
                                    />
                                    <div className="pokemon_info">
                                        <h3>{pokemon.name}</h3>
                                        <p>Number: {pokemon.number}</p>
                                        <p>Weight: {pokemon.weight}</p>
                                        <p>Height: {pokemon.height}</p>
                                        <p>Health: {pokemon.health}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Damn it, Database empty!</p>
                        )}
                    </>
                )}
            </div>

            <FormModal isOpen={isModalOpen} onClose={closeModal} />
        </PokedexScreenWrapper>
    );
};

export default PokedexScreen;
