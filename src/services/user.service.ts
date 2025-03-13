import {
  createUserInDb,
  deleteUserInDb,
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
} from "@/repository/user.repository";
import { CreateUserInput } from "@/types/user";

export const userService = {
  async createUser(input: CreateUserInput) {
    const user = await createUserInDb(input);
    return user;
  },

  async getAllUsers() {
    const users = await getAllUsersFromDb();
    return users;
  },

  async getUserById(userId: number) {
    const user = await getUserByIdFromDb(userId);
    return user;
  },

  async updateUser(userId: number, input: CreateUserInput) {
    const updatedUser = await updateUserInDb(userId, input);
    return updatedUser;
  },

  async deleteUser(userId: number) {
    await deleteUserInDb(userId);
    return { message: "User deleted successfully" };
  },
};
