import { NextFunction, Request, Response } from "express";
import jwt, { DecodeOptions, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { config } from "../config";
import User from "../models/Users";
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
  validateAccessTokenMiddleware = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    // Verifies the Token
    jwt.verify(
      token,
      config.accessTokenSecret,
      async (err: any, decoded: any) => {
        if (err) return res.status(403);

        // Checks our DB if we have a user with the email in the token
        const validUser = await User.findAll({
          where: { id: decoded.id },
        });

        // If that user Exists, then the Access Token is still valid
        if (validUser.length > 0) {
          req.user = decoded;
          next();
          return;
        }
        return res.sendStatus(401);
      }
    );
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
