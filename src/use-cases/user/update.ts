import { NotFoundError, UnauthorizedError } from "@/infrastructure/https/error/HttpErrors.js";
import IUserRepository from "@/interfaces/user.interface.js";
import { UpdateUserInput } from "@/schema/user.schema.js";
import { encodePassword } from "@/utils/bcrypt.js";

export default function makeUpdateUser(repo: IUserRepository) {
    return function update(id: number, updateData: UpdateUserInput, currentId: string) {
        const user = repo.findUserById(id)

        if(!user) {
            throw new NotFoundError("Usuario nao existe")
        }
        
        if(user.id !== Number(currentId)) {
            throw new UnauthorizedError("Nao pode alterar outros usuarios")
        }

        const dataToUpdate = { ...updateData }
        if (dataToUpdate.password) {
            dataToUpdate.password = encodePassword(dataToUpdate.password)
        }

        const updatedUser = repo.updateUser(user.id, dataToUpdate)

        const { password, ...userWithoutPassword } = updatedUser!

        return userWithoutPassword
    }
}