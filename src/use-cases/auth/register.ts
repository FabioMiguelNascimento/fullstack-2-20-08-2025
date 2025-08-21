import { ConflictError } from "@/infrastructure/https/error/HttpErrors.js"
import IUserRepository from "@/interfaces/user.interface.js"
import { CreateUserSchema, User } from "@/schema/user.schema.js"
import { encodePassword } from "@/utils/bcrypt.js"

export default function makeRegisterUser(repo: IUserRepository) {
    return function createUser(registerPayload: CreateUserSchema): User {
        const existingUser = repo.findByEmail(registerPayload.email)

        if(existingUser) {
            throw new ConflictError("Usuario ja registrado com esse email")
        }

        const hashedPassword = encodePassword(registerPayload.password)

        registerPayload = { ...registerPayload, password: hashedPassword}

        const user = repo.create(registerPayload)

        return user
    }
}