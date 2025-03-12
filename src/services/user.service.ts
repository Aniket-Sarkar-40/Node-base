import db from "@/db/client";

interface CreateUserInput {
  email: string;
  name?: string;
}

export const userService = {
  async createUser(input: CreateUserInput) {
    const user = await db.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
    return user;
  },

  async getAllUsers() {
    const users = await db.user.findMany();
    return users;
  },

  async getUserById(userId: number) {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  },

  async updateUser(userId: number, input: CreateUserInput) {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        email: input.email,
        name: input.name,
      },
    });
    return updatedUser;
  },

  async deleteUser(userId: number) {
    await db.user.delete({
      where: { id: userId },
    });
    return { message: "User deleted successfully" };
  },
};
