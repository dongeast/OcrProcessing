import { initializeAuth } from '~/lib/auth/auth'
import { toWebRequest } from 'h3'
import { getD1DB } from '~/server/database/database'
import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
  /* 1. 获取 D1 数据库绑定 */
  let dbBinding: D1Database;
  try {
    dbBinding = getD1DB(event);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'D1 绑定未找到，请检查 wrangler.toml 是否声明 [[d1_databases]]',
    })
  }

  /* 2. 初始化 auth（带运行时 DB） */
  const auth = initializeAuth(dbBinding)

  /* 3. 处理请求 */
  return auth.handler(toWebRequest(event))
})