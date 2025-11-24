import { db, dbType, isSqlite, getD1DB } from '~/server/database/database';

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    let connectionStatus = 'unknown';
    let dbInfo: any = {};
    
    // 根据数据库类型使用不同的连接方式
    let databaseInstance = db;
    if (dbType === 'd1') {
      // 对于 D1 数据库，我们需要从事件中获取数据库实例
      try {
        databaseInstance = getD1DB(event);
      } catch (error) {
        console.warn('无法获取D1数据库实例，使用默认实例:', error);
      }
    }
    
    if (dbType === 'sqlite' || dbType === 'd1') {
      // 对于 SQLite 和 D1，尝试执行简单查询
      try {
        // 使用 Drizzle ORM 的方式执行查询
        await databaseInstance.select().from({}).execute('SELECT 1 as connected');
        connectionStatus = 'connected';
      } catch (error: any) {
        console.error('SQLite/D1 connection error:', error);
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        // 尝试列出所有表
        const tablesResult = await databaseInstance.select().from({}).execute(
          "SELECT name FROM sqlite_master WHERE type='table'"
        );
        dbInfo.tables = tablesResult.rows || tablesResult;
      } catch (error: any) {
        console.error('SQLite/D1 table query error:', error);
        dbInfo.error = error.message;
        // 即使出错也返回错误信息
        dbInfo.errorMessage = error.message;
        dbInfo.errorStack = process.env.NODE_ENV === 'development' ? error.stack : '隐藏以确保生产环境安全';
      }
    } else {
      // 对于 MySQL
      try {
        const result = await databaseInstance.execute('SELECT 1 as connected');
        connectionStatus = result ? 'connected' : 'disconnected';
      } catch (error: any) {
        console.error('MySQL connection error:', error);
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        const tablesResult = await databaseInstance.execute(
          "SELECT TABLE_NAME as name FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE()"
        );
        dbInfo.tables = tablesResult.rows || tablesResult;
      } catch (error: any) {
        console.error('MySQL table query error:', error);
        dbInfo.error = error.message;
        // 即使出错也返回错误信息
        dbInfo.errorMessage = error.message;
        dbInfo.errorStack = process.env.NODE_ENV === 'development' ? error.stack : '隐藏以确保生产环境安全';
      }
    }
    
    return {
      status: 'success',
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
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      // 确保即使在顶层捕获错误时也返回所有信息
      data: {
        databaseType: dbType,
        isSqlite: isSqlite,
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