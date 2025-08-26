import z from 'zod'

export const RoleEnum = z.enum(['ADMIN', 'MANAGER', 'USER'])

export type Role = z.infer<typeof RoleEnum>;

export const userIdSchema = z.object({
  id:z.coerce.number().int().positive(),
})

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2, "Nome precisa de pelo menos 2 caracteres"),
  email: z.string().email(),
  password: z.string().min(6, "Senha precisa de pelo menos 6 caracteres"),
  role: RoleEnum,
  createdAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
  updatedAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
})

export type User = z.infer<typeof userSchema>

export const createUserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export type UserIdType = z.infer<typeof userIdSchema>