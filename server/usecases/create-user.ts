/**
 * Create user use case
 * Business logic: validate and persist user
 */

import { User, UserRepository, validateEmail, validateName } from '@/server/domain/user'

export interface CreateUserInput {
  email: string
  name: string
}

export interface CreateUserOutput {
  id: string
  email: string
  name: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { email, name } = input

    // Validate email
    if (!validateEmail(email)) {
      throw new Error('Invalid email format')
    }

    // Validate name
    if (!validateName(name)) {
      throw new Error('Name cannot be empty')
    }

    // Check if email already exists
    const existingUser = await this.userRepository.getByEmail(email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    // Create user
    const user: User = {
      id: crypto.randomUUID(),
      email,
      name,
      createdAt: new Date(),
    }

    // Persist
    await this.userRepository.create(user)

    // Return output
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
}
