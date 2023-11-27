export interface UsersRepository {
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: any): Promise<User | null>
}