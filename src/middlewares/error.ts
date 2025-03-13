import { NextFunction, Request, Response } from "express";
import ErrorHandler from "@/utils/errorHandler.js";
import { envMode } from "@/config";
import { ApiResponse } from "@/types/global";
import { BaseResponse } from "@/utils/baseResponse";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err);

  err.message ||= "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  const response: ApiResponse = {
    success: false,
    message: err.name,
    errorMessage: err.message,
  };

  if (envMode === "DEVELOPMENT") {
    response.err = err;
  }

  return res.status(err.statusCode).json(new BaseResponse(response));
};

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<unknown, Record<string, unknown>>>;

export const TryCatch =
  (passedFunc: ControllerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
