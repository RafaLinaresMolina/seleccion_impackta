import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { createPokemon } from '../../reducer/pokemonActions.redux';
import { Pokemon } from '../../actions/Pokemon.actions';
import Swal from 'sweetalert2';
import FormModalWrapper from './FormModal.style';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Omit<Pokemon, 'id'>>({
        name: '',
        height: 0,
        number: 0,
        health: 0,
        weight: 0,
        url: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'name' || name === 'url' ? value : Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(createPokemon(formData));

            if (createPokemon.fulfilled.match(resultAction)) {
                Swal.fire({
                    title: `${formData.name} Added!`,
                    text: 'The Pokémon has been added to your Pokédex!',
                    icon: 'success',
                    confirmButtonText: 'Done',
                    background: '#E63950',
                    color: '#FFFFFF',
                    confirmButtonColor: '#3D7DCA',
                    iconColor: '#4CAF50',
                });

                setFormData({
                    name: '',
                    height: 0,
                    number: 0,
                    health: 0,
                    weight: 0,
                    url: '',
                });
                onClose();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add Pokémon. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    background: '#fff',
                    color: '#333',
                    confirmButtonColor: '#3D7DCA',
                    iconColor: '#E63950',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add Pokémon. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#E63950',
                background: '#fff',
                iconColor: '#E63950',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <FormModalWrapper>
            <div className="shadow">
                <div className="modal">
                    <h2 className="modal_title">Add New Pokémon</h2>
                    <span className="close_modal" onClick={onClose}>
                        ✕
                    </span>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="number"
                            placeholder="Number"
                            value={formData.number || ''}
                            onChange={handleChange}
                            required
                            min="1"
                        />

                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={formData.height || ''}
                            onChange={handleChange}
                            required
                            min="0.1"
                            step="0.1"
                        />

                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight"
                            value={formData.weight || ''}
                            onChange={handleChange}
                            required
                            min="0.1"
                            step="0.1"
                        />

                        <input
                            type="number"
                            name="health"
                            placeholder="Health"
                            value={formData.health || ''}
                            onChange={handleChange}
                            required
                            min="1"
                        />

                        <input
                            type="url"
                            name="url"
                            placeholder="Image URL"
                            value={formData.url}
                            onChange={handleChange}
                            required
                        />

                        <div className="btn_container">
                            <button type="submit">Add Pokémon!</button>
                        </div>
                    </form>
                </div>
            </div>
        </FormModalWrapper>
    );
};

export default FormModal;
