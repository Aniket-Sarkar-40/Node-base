import { Request, Response } from "express";
import { BaseResponse } from "../utils/baseResponse";
import { userService } from "@/services/user.service";
import { TryCatch } from "@/middlewares/error";
import { UserDTO } from "@/types/user";
import { toUserDTO } from "@/Mapper/userMapper";

export const createUser = TryCatch(async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user = await userService.createUser({ email, name });
  const response = new BaseResponse(
    { success: true, message: "User Created Successfully." },
    user
  );
  return res.status(201).json(response);
});

export const getAllUsers = TryCatch(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res
    .status(200)
    .json(
      new BaseResponse(
        { success: true, message: "Users Fetched Successfully." },
        users
      )
    );
});

export const getUserById = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userService.getUserById(Number(userId));

  if (!user) {
    return res.status(404).json(
      new BaseResponse({
        success: false,
        message: "User Not Found.",
        errorCode: "NOT_FOUND",
        errorMessage: "User not found.",
      })
    );
  }
  const userDto: UserDTO = toUserDTO(user);
  return res
    .status(200)
    .json(
      new BaseResponse(
        { success: true, message: "User Fetched Successfully." },
        userDto
      )
    );
});

export const updateUser = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, name } = req.body;
  const updatedUser = await userService.updateUser(Number(userId), {
    email,
    name,
  });
  return res
    .status(200)
    .json(
      new BaseResponse(
        { success: true, message: "User Updated Successfully." },
        updatedUser
      )
    );
});

export const deleteUser = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const message = await userService.deleteUser(Number(userId));
  return res
    .status(200)
    .json(new BaseResponse({ success: true, message: message.message }));
});
