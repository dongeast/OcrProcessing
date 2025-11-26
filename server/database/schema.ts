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

// 辅助函数：获取默认时间戳
function getDefaultTimestamp() {
  return sql`CURRENT_TIMESTAMP`;
}

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
  emailVerified: integer('email_verified', { mode: 'timestamp' }), // Date | null
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

/* ----------  2. session  ---------- */
const session = sqliteTable('session', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),          // v1 新增
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

/* ----------  3. account  ---------- */
const account = sqliteTable('account', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(), // provider 返回的 uid
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'), // 仅邮箱/密码登录时存哈希
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

/* ----------  4. verification  ---------- */
const verification = sqliteTable('verification', {
  id: text('id').primaryKey().$defaultFn(createId),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  fileName: text('file_name').notNull(),
  fileType: text('file_type'),
  fileSize: integer('file_size'),
  status: text('status').default('uploaded'),
  processingStatus: text('processing_status'),
  totalPages: integer('total_pages'),
  language: text('language'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
});

const documentPages = sqliteTable('document_pages', {
  id: text('id').primaryKey(),
  documentId: text('document_id').notNull(),
  pageNumber: integer('page_number').notNull(),
  pageText: text('page_text'),
  status: text('status').default('pending'),
  confidenceScore: integer('confidence_score'),
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
  documentCount: integer('document_count').default(0),
  pageCount: integer('page_count').default(0),
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

// 导出所有表
export {
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

// 导出schema对象
export const schema = {
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

// 导出异步函数以保持向后兼容性
export async function getSchema() {
  return schema;
}

// 导出数据库类型以便在其他地方使用
export { dbType, isSqlite };