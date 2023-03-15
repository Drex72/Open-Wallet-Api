import responseHandler from "../handlers/ResponseHandler";
import bcrypt from "bcrypt";
class AuthService {
  /**
   * Create a user
   * @param {String} email
   * @param {String} password
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  async createUser(
    email: string,
    password: string
  ): Promise<{
    response: { code: number; message: string; status: boolean };
    statusCode: number;
  }> {
    try {
      // Check if email exists
      // Encrypt Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store basic info in jwt
      // Return JWT
      // Store refresh token in cookie
      return responseHandler.responseSuccess(200, "Logged in Successfully", {
        email,
        hashedPassword,
      });
    } catch (error) {
      return responseHandler.responseError(400, "error");
    }
  }
  /**
   * Login a user
   * @param {String} email
   * @param {String} password
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  async login(
    email: string,
    password: string
  ): Promise<{
    response: { code: number; message: string; status: boolean };
    statusCode: number;
  }> {
    try {
      // Check if email exists
      // Check if the password Correlates
      // Store basic info in jwt
      // Return JWT
      // Store refresh token in cookie
      return responseHandler.responseSuccess(200, "Logged in Successfully", {
        email,
        password,
      });
    } catch (error) {
      return responseHandler.responseError(400, "error");
    }
  }
}

export default AuthService;
