import db from "@/database/db.js";
import IUserRepository from "@/interfaces/user.interface.js";
import { User, CreateUserSchema } from "@/schema/user.schema.js";

export default class UserRepository implements IUserRepository {
    findByEmail(email: string): User | undefined {
        return db.users.find(u => u.email === email)
    }
    
    create(user: CreateUserSchema): User {
        const newUser = {
            id: db.users.length + 1,
            updatedAt: new Date(),
            createdAt: new Date(),
            role: 'USER',
            ...user
        } as User

        db.users.push(newUser)

        return newUser
    }

    findAll(): User[] | void {
        const users = db.users

        return users
    }

    findUserById(id: number): User | undefined {
        const user = db.users.find(u => u.id == id)

        return user
    }

    delete(id: number): void {
        const index = db.users.findIndex(u => u.id == id)

        db.users.splice(index, 1)
    }
}