import { db, dbType, isSqlite, getD1DB } from '~/server/database/database';
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  let str = ''
  try {
    // 测试数据库连接
    let connectionStatus = 'unknown';
    let dbInfo: any = {};
    
    str = str + dbType + ';'

    // 根据数据库类型使用不同的连接方式
    let databaseInstance = db;
    if (dbType === 'd1') {
      // 对于 D1 数据库，我们需要从事件中获取数据库实例
      try {
        databaseInstance = getD1DB(event);
        console.log('D1 instance:', getD1DB(event))
        str = str + 'get D1 instance;'
      } catch (error) {
        console.warn('无法获取D1数据库实例，使用默认实例:', error);
      }
    }
    
    if (dbType === 'd1') {
      // 对于 SQLite 和 D1，尝试执行简单查询
      try {
        // 连接测试
        const connected = await databaseInstance.select({ ok: sql<number>`1` }).from(sql`sqlite_master`).limit(1)
        connectionStatus = 'connected';
        str = str + 'D1 instance connected;'
      } catch (error: any) {
        console.error('SQLite/D1 connection error:', error);
        connectionStatus = `error: ${error.message}`;
      }
    }
    
    return {
      status: 'success',
      info: str,
      data: {
        databaseType: dbType,
        isSqlite: isSqlite,
        connectionStatus: connectionStatus,
        databaseInfo: dbInfo,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error: any) {
    console.error('Database info API error:', error);
    // 设置状态码和消息
    event.node.res.statusCode = 500;
    return {
      status: 'error',
      info: str,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      // 确保即使在顶层捕获错误时也返回所有信息
      data: {
        databaseType: dbType || 'unknown',
        isSqlite: isSqlite || false,
        connectionStatus: 'error',
        databaseInfo: {
          error: error.message,
          errorMessage: error.message,
          errorStack: process.env.NODE_ENV === 'development' ? error.stack : '隐藏以确保生产环境安全'
        }
      }
    };
  }
});