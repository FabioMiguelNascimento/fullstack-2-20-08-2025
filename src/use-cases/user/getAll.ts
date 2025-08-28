import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IUserRepository from "@/interfaces/user.interface.js";

export default function makeGetAllUsers(repo: IUserRepository) {
    return function getAll() {
        const users = repo.findAll()

        if(!users || users.length === 0) {
            throw new NotFoundError("Nenhum usuario encontrado")
        }

        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        })

        return usersWithoutPassword
    }
}