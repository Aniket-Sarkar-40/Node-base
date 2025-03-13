export interface UserDTO {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}
