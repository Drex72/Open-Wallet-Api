import sequelizeConnection from "../config/database";
import responseHandler from "../handlers/ResponseHandler";
import Wallet from "../models/Wallets";
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
      const allWallets = await Wallet.findAll({
        where: { userId: user_id },
      });
      // const [results, metadata] = await sequelizeConnection.query(
      //   `SELECT * FROM wallet JOIN currency ON wallet.curencyId=currency.id WHERE wallet.userId='${user_id}'`
      // );

      return responseHandler.responseSuccess(
        200,
        "All Wallets Fetched Successfully",
        allWallets
      );
    } catch (error: any) {
      return responseHandler.responseError(400, error);
    }
  }

  /**
   * Returns a wallet by it's Id
   * @param wallet_id This is the Id of the wallet to be returned
   */

  async getWalletById(wallet_id: string) {
    const wallet = await Wallet.findAll({ where: { id: wallet_id } });
    if (wallet.length) {
      return responseHandler.responseSuccess(
        200,
        "Wallet Retrieved Successfully",
        wallet
      );
    }
    return responseHandler.responseError(400, "Wallet Not Found");
  }
  /**
   * Deletes the wallet with the Given Id
   * @param wallet_id This is the Id of the wallet to be Deleted
   */
  async deleteWalletById(wallet_id: string) {
    const deletedWallet = await Wallet.destroy({ where: { id: wallet_id } });
    return responseHandler.responseSuccess(
      204,
      "Wallet deleted Successfully",
      deletedWallet
    );
  }
}

export default WalletService;
