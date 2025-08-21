import { User } from "@/schema/user.schema.ts";

export type LoginUserResponse = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  token: string;
  accessToken: string;
};