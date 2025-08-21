import type { User } from "@/schema/user.schema.js";

export type LoginUserResponse = Omit<User, 'password'> & {
  token: string;
};