import { CreateUserSchema, User } from "@/schema/user.schema.js";

export default interface IUserRepository {
    create(user: CreateUserSchema): User;
    findByEmail(email: string): User | undefined;
    findAll(): User[] | void;
    findUserById(id: string): User | null;
    delete(id: string): void;
    updateUser(id: string, user: Partial<User>): User | null;
}