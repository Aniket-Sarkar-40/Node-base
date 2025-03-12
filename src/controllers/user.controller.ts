import { Request, Response } from "express";
import { BaseResponse } from "../types/baseResponse";
import { userService } from "@/services/user.service";
import { TryCatch } from "@/middlewares/error";

interface UserDTO {
  email: string;
  name?: string;
  type: string;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const createUser = TryCatch(async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user = await userService.createUser({ email, name });
  const response = new BaseResponse(true, user);
  return res.status(201).json(response);
});

export const getAllUsers = TryCatch(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(new BaseResponse(true, users));
});

export const getUserById = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.getUserById(Number(userId));

  const userDto: UserDTO = { ...user, type: "some" } as UserDTO;

  if (!user) {
    return res
      .status(404)
      .json(new BaseResponse(false, undefined, "User not found"));
  }
  return res.status(200).json(new BaseResponse(true, userDto));
});

export const updateUser = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, name } = req.body;
  const updatedUser = await userService.updateUser(Number(userId), {
    email,
    name,
  });
  return res.status(200).json(new BaseResponse(true, updatedUser));
});

export const deleteUser = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const message = await userService.deleteUser(Number(userId));
  return res.status(200).json(new BaseResponse(true, message));
});
