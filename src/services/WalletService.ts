import axios from "axios";
import { isDataView } from "util/types";
import sequelizeConnection from "../config/database";
import responseHandler from "../handlers/ResponseHandler";
import Currency from "../models/Currency";
import Wallet, { WalletMap } from "../models/Wallets";
class WalletService {
  /**
   * Creates The Wallet
   * @param id The User Id of the Person who created the Wallet
   * @param currencyId The Currency Id of the currency in which the wallet was created to have
   * @returns
   */
  async createWallet(
    id: string,
    currencyId: string
  ): Promise<{
    response: { code: number; message: string; status: boolean };
    statusCode: number;
  }> {
    try {
      // Create new Wallet
      const createdWallet = await Wallet.create({
        userId: id,
        curencyId: currencyId,
        balance: 0,
      });

      return responseHandler.responseSuccess(
        201,
        "Created Wallet Successfully",
        createdWallet
      );
    } catch (error: any) {
      return responseHandler.responseError(400, error);
    }
  }

  /**
   *
   * @param user_id This is the User Id Of the User who's wallets are to be fetched
   * @returns
   */
  async getWalletForUser(user_id: string): Promise<{
    response: { code: number; message: string; status: boolean };
    statusCode: number;
  }> {
    try {
      // const allWallets = await Wallet.findAll({
      //   where: { userId: user_id },
      // });
      const [results, metadata] = await sequelizeConnection.query(
        `SELECT * FROM wallet JOIN currency ON wallet.curencyId=currency.id WHERE wallet.userId='${user_id}'`
      );

      return responseHandler.responseSuccess(
        200,
        "All Wallets Fetched Successfully",
        results
      );
    } catch (error: any) {
      return responseHandler.responseError(400, error);
    }
  }
}

export default WalletService;
