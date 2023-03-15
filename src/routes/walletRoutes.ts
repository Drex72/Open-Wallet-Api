import express from "express";
const router = express.Router();

router.route("/").get().post();
router.route("/:id").get().delete();
router.route("/:id/deposits").get().post();
router.route("/:id/deposits/:deposit_id").get();
router.route("/:id/withdrawals").get().post();
router.route("/:id/withdrawals/:withdrawals_id").get();
router.route("/:id/transfers").get().post();
router.route("/:id/transfers/:transfer_id").get();
router.route("/:id/transactions").get()
router.route("/:id/transactions/download").get();

export default router;
