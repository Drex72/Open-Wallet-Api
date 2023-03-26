import jwt from "jsonwebtoken";
import { config } from "../config";
interface ITokenHandler {
  createAccessToken(
    signedInformation: any,
    expiryDate: string | number
  ): string;
  createRefreshToken(
    signedInformation: any,
    expiryDate: string | number
  ): string;
}
class TokenHandler implements ITokenHandler {
  /**
   * @params
   */
  createAccessToken = (signedInformation: any, expiryDate: string | number) => {
    return jwt.sign(signedInformation, config.accessTokenSecret, {
      expiresIn: expiryDate,
    });
  };
  createRefreshToken = (
    signedInformation: any,
    expiryDate: string | number
  ) => {
    return jwt.sign(signedInformation, config.refreshTokenSecret, {
      expiresIn: expiryDate,
    });
  };
  validateAccessToken = (
    signedInformation: any,
    expiryDate: string | number
  ) => {
    jwt.sign(signedInformation, config.accessTokenSecret, {
      expiresIn: expiryDate,
    });
  };
  validateRefreshToken = (
    signedInformation: any,
    expiryDate: string | number
  ) => {
    jwt.sign(signedInformation, config.accessTokenSecret, {
      expiresIn: expiryDate,
    });
  };
}
const tokenHandler = new TokenHandler();
export default tokenHandler;
