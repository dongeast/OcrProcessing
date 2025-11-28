import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import type { H3Event } from 'h3';
import type { D1Database } from '@cloudflare/workers-types';

/**
 * 从 H3 事件的上下文中安全地获取 D1 数据库绑定。
 * @param event H3 事件对象
 * @param bindingName D1 数据库绑定的名称 (例如: 'DB', 'AUTH_DB')
 * @returns D1Database 实例
 */
export function getD1Binding(event: H3Event, bindingName: string = 'DB'): D1Database {
    // Cloudflare Pages/Worker 将绑定注入到 event.context.env 或 event.context.cloudflare.env
    const env = event.context.cloudflare?.env || event.context.env;

    if (!env || !env[bindingName]) {
        // 在找不到绑定时抛出错误，以便于调试
        throw new Error(`D1 binding '${bindingName}' not found in Worker environment. 
                         请检查 wrangler.toml 或 Pages Functions 环境变量配置。`);
    }

    // 显式断言类型
    return env[bindingName] as D1Database;
}

/**
 * 为 D1 数据库绑定返回 Drizzle 客户端实例。
 * @param event H3 事件对象
 * @returns DrizzleD1 client
 */
export function useDrizzleD1(event: H3Event) {
    // 假设你的绑定名称为 'DB'
    const d1Binding = getD1Binding(event, 'DB');

    // Drizzle D1 客户端使用 D1 绑定和 Schema 初始化
    return drizzle(d1Binding, { schema });
}