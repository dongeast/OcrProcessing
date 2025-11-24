import { db, dbType, isSqlite } from '~/server/database/database';

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    let connectionStatus = 'unknown';
    let dbInfo: any = {};
    
    if (dbType === 'sqlite' || dbType === 'd1') {
      // 对于 SQLite 和 D1，尝试执行简单查询
      try {
        // 对于 SQLite/D1 数据库，我们尝试执行一个简单的查询来测试连接
        const result = await db.select().from({}).execute('SELECT 1 as connected');
        connectionStatus = result ? 'connected' : 'disconnected';
      } catch (error: any) {
        console.error('SQLite/D1 connection error:', error);
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        // 尝试列出所有表
        const tablesResult = await db.select().from({}).execute(
          "SELECT name FROM sqlite_master WHERE type='table'"
        );
        dbInfo.tables = tablesResult.rows || tablesResult;
      } catch (error: any) {
        console.error('SQLite/D1 table query error:', error);
        dbInfo.error = error.message;
      }
    } else {
      // 对于 MySQL
      try {
        const result = await db.execute('SELECT 1 as connected');
        connectionStatus = result ? 'connected' : 'disconnected';
      } catch (error: any) {
        console.error('MySQL connection error:', error);
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        const tablesResult = await db.execute(
          "SELECT TABLE_NAME as name FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE()"
        );
        dbInfo.tables = tablesResult.rows || tablesResult;
      } catch (error: any) {
        console.error('MySQL table query error:', error);
        dbInfo.error = error.message;
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
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
  }
});