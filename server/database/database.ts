import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';
import Database from 'better-sqlite3';
import type { D1Database } from '@cloudflare/workers-types';

// 根据环境变量决定数据库类型
const dbType = process.env.DATABASE_TYPE || 'mysql';
const isSqlite = dbType === 'sqlite' || dbType === 'd1';

let db: any;

// 检测是否在Cloudflare Pages环境中运行
const isCloudflareEnvironment = typeof process.env.CF_PAGES !== 'undefined' || typeof (globalThis as any).context !== 'undefined';

if (dbType === 'sqlite') {
  // SQLite数据库连接
  const sqlite = new Database(process.env.DATABASE_URL?.replace('file:', '') || ':memory:');
  db = drizzleSqlite(sqlite, { schema });
} else if (dbType === 'd1') {
  if (isCloudflareEnvironment) {
    // Cloudflare Pages环境中的D1连接
    // 从全局上下文获取D1绑定
    // 在Cloudflare Pages中，D1绑定通常通过环境变量中的DB绑定访问
    // 或者通过globalThis.context.env.DB访问
    const d1Binding = (globalThis as any).context?.env?.DB || process.env.DB;
    if (!d1Binding) {
      throw new Error('D1数据库绑定未找到，请确保已在Cloudflare Pages中正确配置数据库绑定');
    }
    db = drizzleD1(d1Binding as D1Database, { schema });
    console.log('已连接到Cloudflare D1数据库');
  } else {
    // 本地开发环境的D1模拟
    // 使用HTTP客户端连接本地D1开发服务器
    // 注意：这种方法只适用于本地开发，生产环境应使用D1绑定
    if (process.env.D1_DATABASE_URL) {
      // 这里可以添加通过HTTP API连接D1的逻辑
      console.log('警告：在本地模拟D1环境');
    }
    // 回退到SQLite内存数据库
    const sqlite = new Database(':memory:');
    db = drizzleSqlite(sqlite, { schema });
  }
} else {
  // MySQL数据库连接
  const connection = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ocr_processing',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  db = drizzle(connection, { schema, mode: 'default' });
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
  return drizzleD1(cf.env.DB, { schema });
}

export { db, dbType, isSqlite };