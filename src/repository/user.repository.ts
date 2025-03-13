import { CreateUserInput } from "@/types/user";
import db from "../db/client";
import { User } from "@prisma/client";

export const createUserInDb = async (user: CreateUserInput): Promise<User> => {
  return db.user.create({
    data: user,
  });
};

export const getAllUsersFromDb = async (): Promise<User[]> => {
  return db.user.findMany();
};

export const getUserByIdFromDb = async (id: number): Promise<User | null> => {
  return db.user.findUnique({
    where: { id },
  });
};

export const updateUserInDb = async (
  id: number,
  user: CreateUserInput
): Promise<User> => {
  return db.user.update({
    where: { id },
    data: user,
  });
};

export const deleteUserInDb = async (id: number): Promise<User> => {
  return db.user.delete({
    where: { id },
  });
};
