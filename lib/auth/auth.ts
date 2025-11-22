import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '../../server/database/database';
// 导入schema的异步获取函数
import { getSchema } from '../../server/database/schema';

// 创建一个异步函数来初始化auth
let authInstance: any = null;

// 异步初始化auth配置
export async function initializeAuth() {
  if (!authInstance) {
    // 等待schema解析完成
    const resolvedSchema = await getSchema();
    
    // 创建一个简单的对象，包含所需的表，而不是Promise
    // 注意：Better Auth的Drizzle Adapter期望的是单数形式的键名
    const adapterSchema = {
      user: resolvedSchema.users,
      session: resolvedSchema.sessions,
      account: resolvedSchema.accounts,
      verification: resolvedSchema.verification
    };
    
    authInstance = betterAuth({
      debug: true,
      database: drizzleAdapter(db, {
        provider: "sqlite", // 固定为 sqlite，因为数据库已简化为仅支持 SQLite
        schema: adapterSchema
      }),
      // 添加受信任的来源
      trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.ocrprocessing.com",
        "https://ocrprocessing.com",
        "https://ocrprocessing.pages.dev"
      ],
      // 配置google和github社交登录
      socialProviders: {
        google: { 
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
          clientId: process.env.GITHUB_CLIENT_ID as string, 
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }
      }
    });
  }
  return authInstance;
}

// 导出auth获取函数，用于在需要时获取auth实例
export function getAuth() {
  if (!authInstance) {
    throw new Error('Auth not initialized. Call initializeAuth() first.');
  }
  return authInstance;
}

// 为了保持向后兼容性，仍然导出auth，但它将是一个Promise
export const auth = initializeAuth();