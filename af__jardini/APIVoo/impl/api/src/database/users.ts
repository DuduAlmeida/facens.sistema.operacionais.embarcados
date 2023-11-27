import { openDB } from "./db";

export async function listUsers() {
  const db = await openDB()

  const users = await db.all('SELECT * FROM users')

  return users
}