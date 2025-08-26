import { Role } from '@/schema/user.schema.js';

declare module 'express-serve-static-core' {
  export interface Request {
    userId: string;
    userRole: Role;
    validatedData: any;
  }
}