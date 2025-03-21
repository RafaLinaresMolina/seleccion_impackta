import { DataTypes, Model } from "sequelize";
import { db } from "../../config/db";

interface PokemonAttributes {
  id?: number;
  name: string;
  height: number;
  number: number;
  health: number;
  weight: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PokemonEntity extends Model<PokemonAttributes, PokemonAttributes>, PokemonAttributes {}

const Pokemon = db.define<PokemonEntity>(
  "pokemon",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    number: { type: DataTypes.INTEGER, allowNull: false },
    health: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.FLOAT, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  { hooks: {} }
);
export default Pokemon;
