import { sql } from "drizzle-orm";
import 'dotenv/config';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

// 根据环境变量决定数据库类型
const dbType = process.env.DATABASE_TYPE || 'd1';
const isSqlite = dbType === 'sqlite' || dbType === 'd1';

// 定义接口以确保两种数据库实现具有相同的结构
export interface Schema {
  user: any;
  session: any;
  account: any;
  verification: any;

  documents: any;
  documentPages: any;
  documentMetadata: any;
  ocrTasks: any;
  userSettings: any;
  apiKeys: any;
  usageStats: any;
  fileStorage: any;
  npWaitlist: any;
}

// 实现SQLite数据库的schema
async function createSqliteSchema(): Promise<Schema> {
  const sqliteModule = await import('drizzle-orm/sqlite-core');
  const { sqliteTable, integer, text } = sqliteModule;
  
  // 辅助函数：获取默认时间戳
  function getDefaultTimestamp() {
    return sql`CURRENT_TIMESTAMP`;
  }
  
  // 使用SQLite特定类型定义表
  // Waitlist表 - 被其他文件引用
  const npWaitlist = sqliteTable('np_waitlist', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    email: text('email').unique().notNull(),
    country: text('country'),
    ip: text('ip'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(getDefaultTimestamp()),
  });
  
  /* ----------  1. user  ---------- */
  const user = sqliteTable('user', {
    id: text('id').primaryKey().$defaultFn(createId),
    name: text('name'),
    email: text('email').notNull().unique(),
    emailVerified: integer('emailVerified', { mode: 'timestamp' }), // Date | null
    image: text('image'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
  });

  /* ----------  2. session  ---------- */
  const session = sqliteTable('session', {
    id: text('id').primaryKey().$defaultFn(createId),
    userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
    token: text('token').notNull().unique(),          // v1 新增
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
  });

  /* ----------  3. account  ---------- */
  const account = sqliteTable('account', {
    id: text('id').primaryKey().$defaultFn(createId),
    userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accountId: text('accountId').notNull(), // provider 返回的 uid
    providerId: text('providerId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
    refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
    scope: text('scope'),
    idToken: text('idToken'),
    password: text('password'), // 仅邮箱/密码登录时存哈希
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
  });

  /* ----------  4. verification  ---------- */
  const verification = sqliteTable('verification', {
    id: text('id').primaryKey().$defaultFn(createId),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
  });

  const documents = sqliteTable('documents', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    fileName: text('file_name').notNull(),
    fileType: text('file_type'),
    fileSize: text('file_size'),
    status: text('status').default('uploaded'),
    processingStatus: text('processing_status'),
    totalPages: text('total_pages'),
    language: text('language'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const documentPages = sqliteTable('document_pages', {
    id: text('id').primaryKey(),
    documentId: text('document_id').notNull(),
    pageNumber: text('page_number').notNull(),
    pageText: text('page_text'),
    status: text('status').default('pending'),
    confidenceScore: text('confidence_score'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const documentMetadata = sqliteTable('document_metadata', {
    id: text('id').primaryKey(),
    documentId: text('document_id').notNull(),
    key: text('key').notNull(),
    value: text('value'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const ocrTasks = sqliteTable('ocr_tasks', {
    id: text('id').primaryKey(),
    documentId: text('document_id').notNull(),
    status: text('status').default('pending'),
    errorMessage: text('error_message'),
    startedAt: integer('started_at', { mode: 'timestamp' }),
    completedAt: integer('completed_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const userSettings = sqliteTable('user_settings', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    key: text('key').notNull(),
    value: text('value'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const apiKeys = sqliteTable('api_keys', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    key: text('key').notNull(),
    description: text('description'),
    isActive: integer('is_active', { mode: 'boolean' }).default(true),
    lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const usageStats = sqliteTable('usage_stats', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    documentCount: text('document_count').default('0'),
    pageCount: text('page_count').default('0'),
    date: text('date').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const fileStorage = sqliteTable('file_storage', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull().default(getDefaultTimestamp()),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });

  
  return {
    user,
    session,
    account,
    verification,
    documents,
    documentPages,
    documentMetadata,
    ocrTasks,
    userSettings,
    apiKeys,
    usageStats,
    fileStorage,
    npWaitlist
  };
}

// 由于我们使用动态导入，需要创建一个立即执行的异步函数来初始化schema
let schemaPromise: Promise<Schema>;

// 初始化schemaPromise
schemaPromise = createSqliteSchema();

// 导出一个异步函数来获取schema
export async function getSchema() {
  return await schemaPromise;
}

// 为了保持向后兼容性，我们需要导出所有表
// 但由于是异步的，我们需要使用不同的方法
// 注意：使用这些导出的组件需要在异步上下文中

// 导出所有表的异步getter函数
export const getUsers = async () => (await getSchema()).user;
export const getSessions = async () => (await getSchema()).session;
export const getAccounts = async () => (await getSchema()).account;
export const getVerification = async () => (await getSchema()).verification;
export const getDocuments = async () => (await getSchema()).documents;
export const getDocumentPages = async () => (await getSchema()).documentPages;
export const getDocumentMetadata = async () => (await getSchema()).documentMetadata;
export const getOcrTasks = async () => (await getSchema()).ocrTasks;
export const getUserSettings = async () => (await getSchema()).userSettings;
export const getApiKeys = async () => (await getSchema()).apiKeys;
export const getUsageStats = async () => (await getSchema()).usageStats;
export const getFileStorage = async () => (await getSchema()).fileStorage;
export const getNpWaitlist = async () => (await getSchema()).npWaitlist;

// 为了兼容现有的代码，我们仍然导出表名，但它们将是Promise
// 注意：使用这些导出需要等待Promise解析
export const user = schemaPromise.then(s => s.user);
export const session = schemaPromise.then(s => s.session);
export const account = schemaPromise.then(s => s.account);
export const verification = schemaPromise.then(s => s.verification);
export const documents = schemaPromise.then(s => s.documents);
export const documentPages = schemaPromise.then(s => s.documentPages);
export const documentMetadata = schemaPromise.then(s => s.documentMetadata);
export const ocrTasks = schemaPromise.then(s => s.ocrTasks);
export const userSettings = schemaPromise.then(s => s.userSettings);
export const apiKeys = schemaPromise.then(s => s.apiKeys);
export const usageStats = schemaPromise.then(s => s.usageStats);
export const fileStorage = schemaPromise.then(s => s.fileStorage);
export const npWaitlist = schemaPromise.then(s => s.npWaitlist);

// 导出数据库类型以便在其他地方使用
export { dbType, isSqlite };