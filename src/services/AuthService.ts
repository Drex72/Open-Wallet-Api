import responseHandler from "../handlers/ResponseHandler";
import bcrypt from "bcrypt";
import User from "../models/Users";
import ApiErrorException from "../exceptions/ApiErrorException";
import tokenHandler from "../handlers/TokenHandlers";

class AuthService {
  /**
   * Create a user
   * @param {String} email
   * @param {String} password
   *  @param {String} firstname
   * @param {String} lastname
   * @returns {Promise<{response: {code: *, message: *, status: boolean}, statusCode: *}>}
   */
  async createUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<{
    response: { code: number; message: string; status: boolean };
    statusCode: number;
  }> {
    try {
      // Check if email exists
      const result = await User.findAll({ where: { email } });
      if (result.length) {
        return responseHandler.responseError(400, "User Exists Already");
      }

      // Encrypt Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store email and Password in DB
      await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });

      // Handles the response for me
      return responseHandler.responseSuccess(201, "Created User Successfully", {
        email,
        firstname,
        lastname,
      });
    } catch (error) {
      throw new ApiErrorException("Error", 400);
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
    response: { code: number; message: string; status: boolean; data?: any };
    statusCode: number;
  }> {
    try {
      // UserMap(sequelizeConnection);

      // Check if email exists
      const result = await User.findOne({ where: { email } });
      if (!result) {
        return responseHandler.responseError(400, "Invalid Login Details");
      }
      const currentUser = result.dataValues;

      // Check if the password Correlates
      const isPasswordMatch = await bcrypt.compare(
        password,
        currentUser.password!
      );

      // Return Error Message if The password is Wrong
      if (!isPasswordMatch) {
        return responseHandler.responseError(400, "Invalid Login Details");
      }

      // Store basic info in jwt
      const accessToken = tokenHandler.createAccessToken(
        {
          id: currentUser.id,
          firstname: currentUser.firstname,
          email: currentUser.email,
        },
        "1d"
      );
      const refreshToken = tokenHandler.createRefreshToken(
        {
          id: currentUser.id,
          firstname: currentUser.firstname,
        },
        "1d"
      );

      // Return Access Token
      return responseHandler.responseSuccess(200, "Logged in Successfully", {
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log("error", error);
      return responseHandler.responseError(400, "error");
    }
  }
}

export default AuthService;
