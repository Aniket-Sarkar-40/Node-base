import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BaseResponse } from "../utils/baseResponse";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(50).optional(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(new BaseResponse(false, undefined, error.details[0].message));
  }

  next();
};
