import z from 'zod';

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const productSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Nome é necessário'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser um número positivo'),
  quantity: z.number().min(0, 'Quantidade minima de 0').optional(),
  createdAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
  updatedAt: z.preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date()),
  createdBy: z.string().min(1),
  updatedBy: z.string().min(1).nullable().optional()
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é necessário'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser um número positivo'),
  quantity: z.number().min(0, 'Quantidade minima de 0').optional().default(0),
});

export const listProductSchema = z.object({
  name: z.string().min(1, 'Nome nao pode ser menor que um').optional(),
  description: z.string().min(1, 'Descricao nao pode ser menor que 1').optional(),
  price: z.number().min(0, 'Preço deve ser um número positivo').optional(),
  quantity: z.number().min(0, 'Quantidade minima de 0').optional(),
})

export type ListproductInput = z.infer<typeof listProductSchema>

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type ProductIdInput = z.infer<typeof productIdSchema>;
