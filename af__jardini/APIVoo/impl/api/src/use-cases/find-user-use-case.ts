import { UsersRepository } from "../repositories/users-repository";

export class FindUserUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(id) {
    const user = await this.usersRepository.findById(id)

    if(!user) {
      throw new Error("Usuário não encontrado.")
    }

    return user
  }
}