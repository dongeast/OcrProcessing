import { toWebRequest } from 'h3';
// 假设这是你之前使用的 D1 绑定提取函数
import { getD1Binding } from '~/server/database/database';
// 假设 initializeAuth 现在是需要 D1 绑定的函数
import { initializeAuth } from '~/lib/auth/auth';


export default defineEventHandler(async (event) => {
  const request = new Request(getRequestURL(event), {
    method: getMethod(event),
    headers: new Headers(getHeaders(event) as any),
    body: getMethod(event) !== 'GET' ? JSON.stringify(await readBody(event)) : undefined,
  })

  // 1. 【核心区别】: 获取 D1 绑定
  let dbBinding;
  try {
    // 假设你的 D1 绑定名称是 'DB'
    dbBinding = getD1Binding(event);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'D1 绑定失败' || error,
    });
  }
  // 2. 【核心区别】: 在每次请求中，传入 D1 绑定来初始化 Auth 实例
  const authInstance = initializeAuth(dbBinding);
  // 3. 处理请求
  const res = await authInstance.handler(request)

  setResponseStatus(event, res.status)
  setResponseHeaders(event, Object.fromEntries(res.headers))

  return res.text()
})