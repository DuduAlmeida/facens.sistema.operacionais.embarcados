import { Request, Response } from 'express'
import { AuthenticateUseCase } from '../use-cases/authenticate';
import { SqliteUsersRepository } from '../repositories/sqlite/sqlite-users-repository';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const usersRepository = new SqliteUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const user = await authenticateUseCase.execute({ email, password })

    if (user) {
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      })
    }
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }
}