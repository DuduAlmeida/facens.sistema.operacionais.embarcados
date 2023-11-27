import { SqliteUsersRepository } from "../repositories/sqlite/sqlite-users-repository"
import { FindUserUseCase } from "../use-cases/find-user-use-case"

export async function checkUserAuth(req, res, next) {
  try {
    if (!req.headers['user-id']) {
      throw new Error('Usuário não está autenticado')
    } else {
      const usersRepository = new SqliteUsersRepository()
      const findUserUseCase = new FindUserUseCase(usersRepository)

      const user = await findUserUseCase.execute(Number(req.headers['user-id']))

      if (user) {
        next()
      }
    }
  } catch (e) {
    res.status(500).json({ message: String(e) })
  }
}