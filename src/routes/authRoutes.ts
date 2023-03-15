import express from "express";
import authController from "../controllers/AuthController";
import authValidation from "../validators/AuthValidation";

const router = express.Router();

router
  .route("/")
  .post(authValidation.createUserValidation, authController.registerUser);
router
  .route("/login")
  .post(authValidation.userLoginValidation, authController.loginUser);

export default router;
