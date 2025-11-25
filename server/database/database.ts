import 'dotenv/config';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import type { D1Database } from '@cloudflare/workers-types';

// 根据环境变量决定数据库类型
const dbType = process.env.DATABASE_TYPE || 'mysql';
const isSqlite = dbType === 'sqlite' || dbType === 'd1';

let db: any;
let dbOriginal: any;

// 检测是否在Cloudflare Pages环境中运行
const isCloudflareEnvironment = typeof process.env.CF_PAGES !== 'undefined' || typeof (globalThis as any).context !== 'undefined';

// 仅支持D1数据库
if (isCloudflareEnvironment) {
  const d1Binding = (globalThis as any).context?.env?.DB || process.env.DB;
  if (!d1Binding) {
    throw new Error('D1数据库绑定未找到，请确保已在Cloudflare Pages中正确配置数据库绑定');
  }
  dbOriginal = d1Binding as D1Database;
  db = drizzleD1(d1Binding as D1Database, { schema });
  console.log('已连接到Cloudflare D1数据库');
}

// 数据库迁移函数
export async function runMigrations() {
  try {
    if (isSqlite) {
      // 使用SQLite兼容的迁移文件
      await migrateSqlite(db, { migrationsFolder: './server/migrations' });
      console.log('SQLite数据库迁移成功');
    } else {
      // MySQL迁移
      await migrate(db, { migrationsFolder: './server/migrations' });
      console.log('MySQL数据库迁移成功');
    }
  } catch (error) {
    console.error('迁移失败:', error);
    throw error;
  }
}

// 获取D1数据库实例的函数
export function getD1DB(event: any) {
  // Cloudflare环境中获取D1绑定的标准方式
  const cf = event.context?.cloudflare as { env: { DB: D1Database } } | undefined;
  if (!cf?.env?.DB) {
    throw new Error('D1绑定"DB"未找到');
  }
  return cf.env.DB;
}

// 获取D1数据库实例的函数
export function getD1DBDrizzle(event: any) {
  // Cloudflare环境中获取D1绑定的标准方式
  const cf = event.context?.cloudflare as { env: { DB: D1Database } } | undefined;
  if (!cf?.env?.DB) {
    throw new Error('D1绑定"DB"未找到');
  }
  return drizzleD1(cf.env.DB, { schema });
}

export { db, dbOriginal, dbType, isSqlite };