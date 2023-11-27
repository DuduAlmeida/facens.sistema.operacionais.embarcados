import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";
import { randomUUID } from "node:crypto"

export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    username,
    email,
    password
  }) {
    const hasRequiredFields = username && email && password

    if (!hasRequiredFields) {
      throw Error("Não foram informados os campos necessários.")
    }

    const password_hash = await hash(password, 10)

    const usersWithSameEmail = await this.usersRepository.findByEmail(email)

    if (usersWithSameEmail) {
      throw new Error("Um usuário com esse email já existe.")
    }

    await this.usersRepository.create({
      id: randomUUID(),
      username,
      email,
      password_hash
    })
  }
}