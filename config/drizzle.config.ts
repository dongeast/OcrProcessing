import type { Config } from 'drizzle-kit';

// 根据环境变量决定数据库类型，默认为mysql
const dbType = process.env.DATABASE_TYPE || 'mysql';
const isSqlite = dbType === 'sqlite';

export default {
    dialect: isSqlite ? 'sqlite' : 'mysql', 
    schema: './server/database/schema.ts', 
    out: './server/migrations', 
    dbCredentials: {
      url: process.env.DATABASE_URL! || 'file:./dev.db'
    }
  } satisfies Config;