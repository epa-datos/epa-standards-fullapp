import { describe, it, expect } from 'vitest'
import { CreateUserUseCase } from '@/server/usecases/create-user'
import { InMemoryUserRepository } from '@/server/adapters/persistence/in-memory-user-repository'

describe('CreateUserUseCase', () => {
  const repository = new InMemoryUserRepository()
  const useCase = new CreateUserUseCase(repository)

  it('should create a user with valid data', async () => {
    const result = await useCase.execute({
      email: 'john@example.com',
      name: 'John Doe',
    })

    expect(result.email).toBe('john@example.com')
    expect(result.name).toBe('John Doe')
    expect(result.id).toBeDefined()
  })

  it('should reject invalid email', async () => {
    await expect(
      useCase.execute({
        email: 'invalid-email',
        name: 'John',
      })
    ).rejects.toThrow('Invalid email format')
  })

  it('should reject empty name', async () => {
    await expect(
      useCase.execute({
        email: 'jane@example.com',
        name: '',
      })
    ).rejects.toThrow('Name cannot be empty')
  })

  it('should reject duplicate email', async () => {
    await useCase.execute({
      email: 'duplicate@example.com',
      name: 'First',
    })

    await expect(
      useCase.execute({
        email: 'duplicate@example.com',
        name: 'Second',
      })
    ).rejects.toThrow('Email already registered')
  })
})
