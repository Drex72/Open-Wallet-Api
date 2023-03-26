import express, { Router } from "express";
import walletController from "../controllers/WalletController";
import tokenHandler from "../handlers/TokenHandlers";
import walletValidation from "../validators/WalletValidationSchema";
const router = express.Router();

router.use(tokenHandler.validateAccessTokenMiddleware);

router
  .route("/")
  .get(walletController.getAllWalletsForUser)
  .post(
    walletValidation.createNewWalletValidation,
    walletController.createWallet
  );
router.route("/:id").get().delete();
router.route("/:id/deposits").get().post();
router.route("/:id/deposits/:deposit_id").get();
router.route("/:id/withdrawals").get().post();
router.route("/:id/withdrawals/:withdrawals_id").get();
router.route("/:id/transfers").get().post();
router.route("/:id/transfers/:transfer_id").get();
router.route("/:id/transactions").get();
router.route("/:id/transactions/download").get();

export default router;
