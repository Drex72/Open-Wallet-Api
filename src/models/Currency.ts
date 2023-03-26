import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import sequelizeConnection from "../config/database";
export default class Currency extends Model<
  InferAttributes<Currency>,
  InferCreationAttributes<Currency>
> {
  public declare id: CreationOptional<string>;
  public declare currencyName: string;
}

export const CurrencyMap = (sequelize: Sequelize) => {
  Currency.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      currencyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize: sequelizeConnection,
      modelName: "currency",
      tableName: "currency",
      freezeTableName: true,
    }
  );
};
