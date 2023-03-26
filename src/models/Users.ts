import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import sequelizeConnection from "../config/database";
import Wallet from "./Wallets";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password: CreationOptional<string | null>;
}

export const UserMap = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "user",
      tableName: "user",
      freezeTableName: true,
      sequelize: sequelize,
      timestamps: true,
    }
  );
  User.sync();
};

// User.hasMany(Wallet);
