import { db, dbType, isSqlite, getD1DB } from '~/server/database/database';
import type {D1Database} from "@cloudflare/workers-types";
import {drizzle as drizzleD1} from "drizzle-orm/d1/driver";
import * as schema from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const cf = event.context?.cloudflare as { env: { DB: D1Database } } | undefined;
    if (!cf?.env?.DB) {
      throw new Error('D1绑定"DB"未找到');
    }
    let databaseInstance = drizzleD1(cf.env.DB, { schema });
    // 对于 SQLite/D1 数据库，我们尝试执行一个简单的查询来测试连接
    const result = await databaseInstance.select().from({}).execute('SELECT 1 as connected');
    let connectionStatus = result ? 'connected' : 'disconnected';

    return {
      status: 'success',
      db: connectionStatus,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      status: 'error',
      timestamp: new Date().toISOString()
    };
  }
});