// lib/auth/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// 导入schema
import * as schema from '../../server/database/schema';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';

export function initializeAuth(dbBinding: D1Database) {
  // 每次都创建新的 auth 实例而不是复用，避免状态问题
  if (!dbBinding) {
    throw new Error('D1数据库绑定未找到 - initializeAuth时必须提供数据库绑定');
  }
  
  const dbToUse = dbBinding;
  
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
  
  return betterAuth({
    debug: process.env.NODE_ENV === 'development',
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
    callbacks: {
      // 确保在回调中正确处理请求状态
      async onRequest(ctx: any) {
        // 可以在这里添加额外的请求处理逻辑
        return ctx
      }
    },
    onError: (err: any) => {
      console.error('>>> BetterAuth 详细错误:', err)
      console.error('>>> 原始堆栈:', err.cause || err.stack)
    },
  });
}

// 移除单例模式，每次需要时重新初始化
export function getAuth(dbBinding: D1Database) {
  return initializeAuth(dbBinding);
}