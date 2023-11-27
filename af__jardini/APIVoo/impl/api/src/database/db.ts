import sqlite3 from "sqlite3";
import { open } from 'sqlite'

export async function openDB() {
  return await open({
    filename: './database.db', // FROM /src NOT THE CURRENT FILE
    driver: sqlite3.Database
  })
}

