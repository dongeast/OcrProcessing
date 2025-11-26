import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbOriginal } from '../../server/database/database';
// 导入schema
import * as schema from '../../server/database/schema';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';

// 创建一个异步函数来初始化auth
let authInstance: any = null;

// 异步初始化auth配置
export async function initializeAuth(dbBinding?: D1Database) {
  if (!authInstance) {
    // 使用传入的数据库绑定或全局的dbOriginal
    const dbToUse = dbBinding || dbOriginal;
    
    if (!dbToUse) {
      throw new Error('D1数据库绑定未找到 - initializeAuth时未提供数据库绑定且dbOriginal为空');
    }
    
    // 创建数据库适配器
    const databaseAdapter = drizzleAdapter(drizzleD1(dbToUse, { schema }), {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification
      },
    });
    
    authInstance = betterAuth({
      debug: true,
      secret: process.env.BETTER_AUTH_SECRET,
      baseURL: process.env.BETTER_AUTH_URL,
      database: databaseAdapter,
      // 添加受信任的来源
      trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8788",
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
      },
      onError: (err: any) => {
        console.error('>>> BetterAuth 详细错误:', err)
        console.error('>>> 原始堆栈:', err.cause || err.stack)
      },
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

// 为了向后兼容性，提供一个延迟初始化的auth对象
// 这样其他文件可以继续使用 import { auth } from '~/lib/auth/auth'
let authPromise: Promise<any> | null = null;
export const auth = {
  // 延迟初始化的API方法
  api: new Proxy({}, {
    get(_target, prop) {
      return async (...args: any[]) => {
        if (!authPromise) {
          authPromise = initializeAuth();
        }
        const instance = await authPromise;
        return instance.api[prop](...args);
      };
    }
  }),
  
  // 其他可能被访问的属性或方法
  handlers: new Proxy({}, {
    get(_target, prop) {
      return async (...args: any[]) => {
        if (!authPromise) {
          authPromise = initializeAuth();
        }
        const instance = await authPromise;
        return instance.handlers[prop](...args);
      };
    }
  }),
  
  // getSession方法
  getSession: async (options: any) => {
    if (!authPromise) {
      authPromise = initializeAuth();
    }
    const instance = await authPromise;
    return instance.api.getSession(options);
  }
};