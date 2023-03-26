import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import sequelizeConnection from "../config/database";
import Currency from "./Currency";
export default class Wallet extends Model<
  InferAttributes<Wallet>,
  InferCreationAttributes<Wallet>
> {
  public declare id: CreationOptional<string>;
  public declare curencyId: string;
  public declare balance: number;
  public declare userId: string;
}

export const WalletMap = (sequelize: Sequelize) => {
  Wallet.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      curencyId: {
        type: DataTypes.UUID,
        references: {
          model: "currency",
          key: "id",
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      tableName: "wallet",
    }
  );
  Wallet.sync();
};

// Wallet.belongsTo(Currency, { foreignKey: "currency" });
