import { compare } from "bcrypt";
import { UsersRepository } from "../repositories/users-repository";

export class AuthenticateUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    const hasRequiredFields = email && password

    if (!hasRequiredFields) {
      throw Error("Não foram informados os campos necessários.")
    }

    const matchedUser = await this.usersRepository.findByEmail(email)

    if (matchedUser) {
      const isValidPassword = await compare(password, matchedUser.password_hash);

      if (isValidPassword) {
        return matchedUser
      } else {
        throw new Error("Senha inválida")
      }
    } else {
      throw new Error("Não foram encontrados usuários com esse e-mail.")
    }
  }
}