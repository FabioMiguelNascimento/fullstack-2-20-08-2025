import { NotFoundError } from "@/infrastructure/https/error/HttpErrors.js";
import IUserRepository from "@/interfaces/user.interface.js";

export default function makeGetAllUsers(repo: IUserRepository) {
    return function getAll() {
        const users = repo.findAll()

        if(!users) {
            throw new NotFoundError("Nenhum usuario encontrado")
        }

        return users
    }
}