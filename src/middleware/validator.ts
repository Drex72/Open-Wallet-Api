import { ObjectSchema } from "joi";
// import { BadRequestException } from "../utils/exceptions";

const validate = (obj: any, schema: ObjectSchema) => {
  const { error, value } = schema.validate(obj);
  //   if (error) throw new BadRequestException(error.message);
};

export default validate;
