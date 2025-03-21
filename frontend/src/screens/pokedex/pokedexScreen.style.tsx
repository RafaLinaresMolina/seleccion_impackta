import styled from 'styled-components';

export const PokedexScreenWrapper = styled.main`
    background-image: url('/assets/images/bg.jpg');
    height: 100vh;
    border: 0;
    margin: 0;
    background-size: cover;

    .actions_container {
        position: absolute;
        right: 30px;
        top: 30px;

        img {
            width: 100px;
            height: 50px;
        }
    }

    .title_section {
        padding: 50px 0;
        margin-bottom: 50px;
        height: 80px;
        display: flex;
        justify-content: center;

        h2 {
            font-family: 'pokemon';
            letter-spacing: 3px;
            font-size: 50px !important;
        }
    }

    .pokedex_container {
        padding: 20px;
        background-color: #ffffff;
        width: 80%;
        height: 350px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }

    .pokemon_card {
        width: 220px;
        background-color: #f8f8f8;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: transform 0.2s;
        border: 3px solid #e63950;
        
        &:hover {
            transform: translateY(-5px);
        }
    }

    .pokemon_image {
        width: 100%;
        height: 180px;
        object-fit: contain;
        border-bottom: 3px solid #e63950;
        background-color: white;
        padding: 10px 0;
    }

    .pokemon_info {
        padding: 15px;
        background-color: #ffebee;
        
        h3 {
            font-family: 'pokemon', sans-serif;
            color: #333;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 18px;
            text-align: center;
            letter-spacing: 1px;
        }
        
        p {
            font-family: 'pokemon', sans-serif;
            font-size: 14px;
            color: #555;
            margin: 5px 0;
            letter-spacing: 0.5px;
        }
    }

    .action_img {
        cursor: pointer;
    }
`;

export default PokedexScreenWrapper;