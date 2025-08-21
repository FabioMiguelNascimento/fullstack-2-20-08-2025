import database from '@/database/db.json' with { type: 'json' };
import { Product } from '@/schema/product.schema.js';
import { User } from '@/schema/user.schema.js';

type DB = {
    users: User[]
    products: Product[]
}

const db = database as unknown as DB    

export default db