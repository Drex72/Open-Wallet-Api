import { Request, Response } from "express";
import bcrypt from "bcrypt";
import AuthService from "../services/AuthService";

class AuthController {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.authService.createUser(email, hashedPassword);
    } catch (error) {}
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // new AuthService().login(email, password);
      this.authService.login(email, password);
      res
        .status(201)
        .json({ message: `Created user with mail ${email} Successfully` });
    } catch (error) {}
  };
}

const authController = new AuthController();
export default authController;
