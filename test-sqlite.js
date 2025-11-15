// 简单的SQLite数据库测试脚本
import 'dotenv/config';
import Database from 'better-sqlite3';

async function testSqliteConnection() {
  console.log('开始测试SQLite数据库连接...');
  
  try {
    // 从环境变量获取数据库路径
    const dbPath = process.env.DATABASE_URL?.replace('file:', '') || './local-db.sqlite';
    console.log(`数据库文件路径: ${dbPath}`);
    
    // 创建SQLite数据库连接
    const sqlite = new Database(dbPath);
    console.log('SQLite数据库连接成功！');
    
    // 测试创建表
    console.log('测试创建表...');
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY,
        name TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('表创建成功！');
    
    // 测试插入数据
    console.log('测试插入数据...');
    sqlite.prepare('INSERT INTO test (name) VALUES (?)').run('测试数据');
    console.log('数据插入成功！');
    
    // 测试查询数据
    console.log('测试查询数据...');
    const result = sqlite.prepare('SELECT * FROM test').all();
    console.log('查询结果:', result);
    
    // 关闭连接
    sqlite.close();
    console.log('\n✅ SQLite数据库测试成功！');
    
  } catch (error) {
    console.error('\n❌ SQLite数据库测试失败:', error);
    console.log('\n请检查以下内容:');
    console.log('1. better-sqlite3依赖是否已安装');
    console.log('2. 数据库文件路径是否有效');
    console.log('3. 文件系统权限是否正确');
  }
}

testSqliteConnection();