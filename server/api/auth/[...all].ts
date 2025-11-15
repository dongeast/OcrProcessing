import { auth, getAuth } from "~/lib/auth/auth"; 
import { toWebRequest } from 'h3';

// 确保auth已经初始化
let authInitialized = false;

// 立即开始初始化auth
auth.then(() => {
  authInitialized = true;
});

// 定义异步事件处理器
export default defineEventHandler(async (event) => {
  // 如果auth还没有初始化，等待它
  if (!authInitialized) {
    await auth;
    authInitialized = true;
  }
  
  // 使用getAuth获取已初始化的auth实例
  const authInstance = getAuth();
  
  // 调用handler处理请求
  return authInstance.handler(toWebRequest(event)); 
});