import { CreateUserSchema, User } from "@/schema/user.schema.js";

export default interface IUserRepository {
    create(user: CreateUserSchema): User;
    findByEmail(email: string): User | undefined;
    findAll(): User[] | void;
    findUserById(id: number): User | undefined;
    delete(id: number): void;
    updateUser(id: string, user: Partial<User>): User | null;
}