/**
 * User domain entity
 * Business logic - no external dependencies
 */

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

/**
 * User repository interface
 * Abstraction for persistence layer
 */
export interface UserRepository {
  create(user: User): Promise<void>
  getByID(id: string): Promise<User | null>
  getByEmail(email: string): Promise<User | null>
  list(): Promise<User[]>
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate name (non-empty)
 */
export function validateName(name: string): boolean {
  return name.trim().length > 0
}
