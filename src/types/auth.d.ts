import type { User } from "@/schema/user.schema.js";

export type LoginUserResponse = Omit<User, 'password'> & {
  token: string;
};

export type RegisterResponse = Omit<User, 'password'> 