import { Request, Response } from 'express'
import { RegisterUseCase } from '../use-cases/register';
import { SqliteUsersRepository } from '../repositories/sqlite/sqlite-users-repository';

export async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const inMemoryUsersRepository = new SqliteUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    await registerUseCase.execute({ username, email, password })
  } catch (e) {
    return res.status(500).json({ message: String(e) })
  }

  return res.status(201).send()
}