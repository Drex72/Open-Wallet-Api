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

  getAllWalletsForUser = async (req: any, res: Response): Promise<void> => {
    const { id: user_id } = req.user!;
    const newWallet = await this.walletService.getWalletForUser(user_id);
    res.status(newWallet.statusCode).send(newWallet.response);
  };
}

const walletController = new WalletController();
export default walletController;
