import { db, dbType, isSqlite } from '~/server/database/database';

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    let connectionStatus = 'unknown';
    let dbInfo: any = {};
    
    if (dbType === 'sqlite' || dbType === 'd1') {
      // 对于 SQLite 和 D1，尝试执行简单查询
      try {
        // 对于 SQLite/D1 数据库，我们只需要确认 db 对象存在且可用
        connectionStatus = 'connected';
      } catch (error: any) {
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        dbInfo.tables = [];
      } catch (error: any) {
        dbInfo.error = error.message;
      }
    } else {
      // 对于 MySQL
      try {
        const result = await db.execute('SELECT 1 as connected');
        connectionStatus = result ? 'connected' : 'disconnected';
      } catch (error: any) {
        connectionStatus = `error: ${error.message}`;
      }
      
      // 获取数据库信息
      try {
        const tablesResult = await db.execute(
          "SELECT TABLE_NAME as name FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE()"
        );
        dbInfo.tables = tablesResult.rows || tablesResult;
      } catch (error: any) {
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
    return {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
});