import { UserDTO } from "@/types/user";
import { User } from "@prisma/client";

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
};
