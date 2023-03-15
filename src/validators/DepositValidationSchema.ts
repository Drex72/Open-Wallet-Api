import * as Joi from "joi";

export const createWalletScheman: Joi.ObjectSchema = Joi.object().keys({
  currency: Joi.string().required(),
});
