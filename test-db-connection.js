// 数据库连接测试脚本
import 'dotenv/config';

async function testDatabaseConnection() {
  console.log('开始测试数据库连接...');
  
  try {
    // 动态导入数据库模块
    const { default: db, runMigrations } = await import('./server/database/database.ts');
    
    // 测试数据库连接
    const dbType = process.env.DATABASE_TYPE || 'mysql';
    console.log(`检测到${dbType.toUpperCase()}模式，尝试执行简单查询...`);
    
    if (dbType === 'sqlite') {
      // 对于SQLite，执行一个简单的查询
      const result = await db.execute('SELECT 1 AS test');
      console.log('SQLite查询结果:', result);
    } else if (dbType === 'd1') {
      // 对于D1，我们只测试连接初始化
      console.log('D1数据库连接初始化成功');
    } else {
      // 对于MySQL，执行一个简单的查询
      const result = await db.execute('SELECT 1 AS test');
      console.log('MySQL查询结果:', result);
    }
    
    // 运行迁移
    console.log('尝试运行数据库迁移...');
    await runMigrations();
    
    console.log('\n✅ 数据库连接和迁移测试成功！');
    console.log('\n当前数据库配置:');
    console.log('- 数据库类型:', dbType);
    
    if (dbType === 'sqlite') {
      console.log('- SQLite文件:', process.env.DATABASE_URL || ':memory:');
    } else if (dbType === 'd1') {
      console.log('- D1 URL:', process.env.D1_DATABASE_URL || '未配置');
    } else {
      console.log('- MySQL配置:');
      console.log('  - 主机:', process.env.DATABASE_HOST || 'localhost');
      console.log('  - 数据库:', process.env.DATABASE_NAME || 'ocr_processing');
      console.log('  - 用户:', process.env.DATABASE_USER || 'root');
    }
    
  } catch (error) {
    console.error('\n❌ 数据库连接测试失败:', error);
    console.log('\n请检查以下内容:');
    console.log('1. 环境变量配置是否正确 (.env 文件)');
    console.log('2. 依赖是否已安装 (npm install)');
    if (process.env.DATABASE_TYPE === 'sqlite') {
      console.log('3. SQLite数据库文件路径是否有效');
    } else if (process.env.DATABASE_TYPE === 'mysql') {
      console.log('3. MySQL服务器是否正在运行');
    }
  }
}

// 运行测试
testDatabaseConnection();