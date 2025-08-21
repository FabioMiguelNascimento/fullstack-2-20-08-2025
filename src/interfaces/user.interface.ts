import { CreateUserSchema, User } from "@/schema/user.schema.js";

export default interface UsersInterface {
    create(user: CreateUserSchema): User | void;
    findUserByEmail(email: string): User | null;
    findAll(): User[] | void;
    findUserById(id: string): User | null;
    delete(id: string): void;
    updateUser(id: string, user: Partial<User>): User | null;
}