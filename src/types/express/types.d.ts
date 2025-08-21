import { Role } from '@/types/user/type.d.ts'

declare module 'express-serve-static-core' {
  export interface Request {
    userId: string;
    userRole: Role;
    validatedData: any;
  }
}