import { openDB } from "../../database/db";
import { UsersRepository } from "../users-repository";

export class SqliteUsersRepository implements UsersRepository {

  async findById(id: number): Promise<User | null> {
    const db = await openDB()

    return await db.get('SELECT * FROM user where id = ?', [id]) ?? null
  }
  async findByEmail(email: string): Promise<User | null> {
    const db = await openDB()
    return await db.get('SELECT * FROM user where email = ?', [email]) ?? null
  }
  async create(data: User): Promise<any> {
    const db = await openDB()

    await db.run('INSERT INTO user(username, email, password_hash) values(?, ?, ?)',
      [data.username, data.email, data.password_hash]
    )
  }
}