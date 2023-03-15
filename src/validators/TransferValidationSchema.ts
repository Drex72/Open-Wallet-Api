import * as Joi from "joi";

export const initiateTansferSchema: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.string().required(),
  destination: Joi.string().required(),
});

export const retreiveAllTransfersSchema: Joi.ObjectSchema = Joi.object().keys({
  wallet_id: Joi.string().required(),
});

export const retreiveSchema: Joi.ObjectSchema = Joi.object().keys({
  wallet_id: Joi.string().required(),
  transfer_id: Joi.string().required(),
});
