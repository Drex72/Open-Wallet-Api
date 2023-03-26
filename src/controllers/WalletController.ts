import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import WalletService from "../services/WalletService";

class WalletController {
  walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }
  /**
   * Creates A wallet for a User
   * @param req The Currency id is being stored in the body object in the req Object
   * @param res
   */
  createWallet = async (req: any, res: Response): Promise<void> => {
    const { currencyId } = req.body;
    const { id } = req.user!;
    const newWallet = await this.walletService.createWallet(id, currencyId);
    res.status(newWallet.statusCode).send(newWallet.response);
  };
  /**
   * Gets All Wallet for a Particular User
   * @param req The User id is being stored in the body object in the req Object
   * @param res
   */
  getAllWalletsForUser = async (req: any, res: Response): Promise<void> => {
    const { id: user_id } = req.user!;
    const allWallets = await this.walletService.getWalletForUser(user_id);
    res.status(allWallets.statusCode).send(allWallets.response);
  };

  /**
   * Retrieves A Wallet through the Id of the Wallet
   * @param req
   * @param res
   */
  getWalletById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const foundWallet = await this.walletService.getWalletById(id);
    res.status(foundWallet.statusCode).send(foundWallet.response);
  };

  /**
   * Deletes A Wallet through the passed Id
   * @param req
   * @param res
   */
  deleteWalletById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedWallet = await this.walletService.deleteWalletById(id);
    res.status(deletedWallet.statusCode).send(deletedWallet.response);
  };
}

const walletController = new WalletController();
export default walletController;
