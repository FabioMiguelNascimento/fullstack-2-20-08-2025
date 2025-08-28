import { NotFoundError, UnauthorizedError } from "@/infrastructure/https/error/HttpErrors.js";
import IUserRepository from "@/interfaces/user.interface.js";
import { Role, RoleEnum } from "@/schema/user.schema.js";

export default function makeDeleteUser(repo: IUserRepository) {
    return function deleteUser(id: number, currentId: string, currentRole: Role) {
        const user = repo.findUserById(id)

        if(!user) {
            throw new NotFoundError("Usuario nao existe")
        }
        
        if(currentRole !== RoleEnum.Enum.ADMIN) {
            throw new UnauthorizedError("Apenas admins podem deletar usuarios")
        }

        if(user.id === Number(currentId)) {
            throw new UnauthorizedError("Nao pode deletar o proprio usuario")
        }

        repo.delete(id);
    }
}   