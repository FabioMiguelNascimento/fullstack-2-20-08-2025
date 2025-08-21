import {  NotFoundError } from "@/infrastructure/https/error/HttpErrors.js"
import IUserRepository from "@/interfaces/user.interface.js"
import { LoginSchemaType } from "@/schema/auth.schema.js"
import { LoginUserResponse } from "@/types/auth.js"
import { decodePassword, encodePassword } from "@/utils/bcrypt.js"
import { generateAccessToken } from "@/utils/generateToken.js"



export default function makeLoginUser(repo: IUserRepository) {
    return function login(loginPayload: LoginSchemaType): LoginUserResponse {
        let user = repo.findByEmail(loginPayload.email)

        if(!user) {
            throw new NotFoundError("Email ou senha invalidos")
        }

        const validatedPassword = decodePassword(user.password, loginPayload.password)

        if(!validatedPassword) {
            throw new NotFoundError("Email ou senha invalidos")
        }

        const token = generateAccessToken(user.id, user.role);

        const { password, ...rest } = user;
        const loginResponse: LoginUserResponse = { ...rest, token };
        
        return loginResponse;
    }
}