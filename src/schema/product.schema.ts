import z from 'zod';

export const productIdSchema = z.object({
  id: z.number().int().positive(),
});

export const productSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Nome é necessário'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser um número positivo'),
  createdAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
  updatedAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é necessário'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser um número positivo'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type ProductIdInput = z.infer<typeof productIdSchema>;
