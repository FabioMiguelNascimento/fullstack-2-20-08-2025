import { ConflictError } from "@/infrastructure/https/error/HttpErrors.js"
import IUserRepository from "@/interfaces/user.interface.js"
import { CreateUserSchema } from "@/schema/user.schema.js"
import { RegisterResponse } from "@/types/auth.js"
import { encodePassword } from "@/utils/bcrypt.js"

export default function makeRegisterUser(repo: IUserRepository) {
    return function createUser(registerPayload: CreateUserSchema): RegisterResponse {
        const existingUser = repo.findByEmail(registerPayload.email)

        if(existingUser) {
            throw new ConflictError("Usuario ja registrado com esse email")
        }

        const hashedPassword = encodePassword(registerPayload.password)

        const userToCreate = { ...registerPayload, password: hashedPassword }

        const user = repo.create(userToCreate)

        const { password, ...userWithoutPassword } = user
        const registerResponse: RegisterResponse = userWithoutPassword

    return registerResponse
    }
}