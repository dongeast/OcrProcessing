import type { Config } from 'drizzle-kit';

// 根据环境变量决定数据库类型，默认为mysql
const dbType = process.env.DATABASE_TYPE || 'mysql';
const isSqlite = dbType === 'sqlite' || dbType === 'd1';

export default {
    dialect: isSqlite ? 'sqlite' : 'mysql', 
    schema: './server/database/schema.ts', 
    out: './server/migrations', 
    dbCredentials: {
      url: process.env.DATABASE_URL!
    },
    // SQLite特定配置
    ...(isSqlite && {
      driver: 'd1-http',
      // 如果是D1，可能需要additional配置
      ...(dbType === 'd1' && {
        http: {
          url: process.env.D1_DATABASE_URL || process.env.DATABASE_URL!,
          headers: process.env.D1_HEADERS ? JSON.parse(process.env.D1_HEADERS) : undefined,
        }
      })
    })
  } satisfies Config;