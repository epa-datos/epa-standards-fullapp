/**
 * In-memory implementation of UserRepository
 * For development and testing
 */

import { User, UserRepository } from '@/server/domain/user'

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map()

  async create(user: User): Promise<void> {
    if (this.users.has(user.id)) {
      throw new Error('User already exists')
    }
    this.users.set(user.id, user)
  }

  async getByID(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async getByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  async list(): Promise<User[]> {
    return Array.from(this.users.values())
  }
}
