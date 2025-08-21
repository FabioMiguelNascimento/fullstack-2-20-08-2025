import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Email inválido.'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.'),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
