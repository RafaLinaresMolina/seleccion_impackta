import styled from 'styled-components';

export const FormModalWrapper = styled.main`
  .shadow {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .modal {
    background-color: #e63950; /* Pokédex red */
    z-index: 100;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 4px solid #8b0000; /* Dark red border */
  }

  .modal form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    justify-content: center; /* Center the inputs */
  }

  .modal input {
    width: calc(50% - 16px);
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #f8f8f8;
    padding: 8px 12px;
    font-size: 14px;
    color: #333;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .modal input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3d7dca; /* Pokémon blue accent */
  }

  .close_modal {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    color: white;
    font-size: 20px;
    background-color: #8b0000; /* Dark red */
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .close_modal:hover {
    background-color: #6a0000; /* Even darker red */
  }

  .btn_container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0 10px;
  }

  .btn_container button {
    border: none;
    color: white;
    padding: 12px 30px;
    background-color: #3d7dca; /* Pokémon blue */
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn_container button:hover {
    background-color: #2a5a9c; /* Darker blue */
  }
    
  .modal {
    content: 'Add New Pokémon';
    display: block;
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    font-family: 'pokemon', sans-serif;
    letter-spacing: 1px;
  }
`;

export default FormModalWrapper;