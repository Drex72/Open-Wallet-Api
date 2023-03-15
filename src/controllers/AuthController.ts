import { Request, Response } from "express";
import AuthService from "../services/AuthService";

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
    try {
      const { email, password } = req.body;
      const newUser = await this.authService.createUser(email, password);
    } catch (error) {}
  };

  /**
   * Logs in a User
   * @param req
   * @param res
   */

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      res.status(201).json({ data: user });
    } catch (error) {}
  };
}

const authController = new AuthController();
export default authController;
