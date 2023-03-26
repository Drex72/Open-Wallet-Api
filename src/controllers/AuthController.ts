import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import currencyService from "../services/CurrencyService";

class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  /**
   *
   * @param req
   * @param res
   * Creates a User
   */

  registerUser = async (req: Request, res: Response): Promise<void> => {
    // Adds Currency To Database
    // currencyService.addCurrencyToDb();

    // Creates The User
    const { email, password, firstname, lastname } = req.body;
    const newUser = await this.authService.createUser(
      email,
      password,
      firstname,
      lastname
    );
    res.status(newUser.statusCode).send(newUser.response);
  };

  /**
   * Logs in a User
   * @param req
   * @param res
   */

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.authService.login(email, password);

    if (user.statusCode === 200) {
      const { refreshToken } = user.response?.data;

      // Store refresh token in cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    res.status(user.statusCode).send(user.response);
  };
}

const authController = new AuthController();
export default authController;
