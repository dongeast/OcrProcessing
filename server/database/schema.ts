import { sql } from "drizzle-orm";
import 'dotenv/config';

// 根据环境变量决定数据库类型
const dbType = process.env.DATABASE_TYPE || 'mysql';
const isSqlite = dbType === 'sqlite' || dbType === 'd1';

// 定义接口以确保两种数据库实现具有相同的结构
export interface Schema {
  users: any;
  sessions: any;
  accounts: any;
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
  
  const users = sqliteTable('users', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash').notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const sessions = sqliteTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  const accounts = sqliteTable('account', {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    scope: text('scope'),
    password: text('password'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(getDefaultTimestamp()),
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
  
  // Verification table required by Better Auth
  const verification = sqliteTable('verification', {
    id: text('id').primaryKey(),
    email: text('email').notNull().default(''),
    identifier: text('identifier').notNull(),
    token: text('token').notNull().default(''),
    value: text('value'),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(getDefaultTimestamp()),
  });
  
  return {
    users,
    sessions,
    accounts,
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

// 实现MySQL数据库的schema
async function createMysqlSchema(): Promise<Schema> {
  const mysqlModule = await import('drizzle-orm/mysql-core');
  const { mysqlTable, serial, varchar, text, boolean, timestamp } = mysqlModule;
  
  // 辅助函数：获取默认时间戳
  function getDefaultTimestamp() {
    return sql`CURRENT_TIMESTAMP`;
  }
  
  // 使用MySQL特定类型定义表
  // Waitlist表 - 被其他文件引用
  const npWaitlist = mysqlTable('np_waitlist', {
    id: serial('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 191 }).notNull().unique(),
    country: varchar('country', { length: 255 }),
    ip: varchar('ip', { length: 255 }),
    createdAt: timestamp('created_at').notNull().default(getDefaultTimestamp()),
  });
  
  const users = mysqlTable('users', {
    id: serial('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    isVerified: boolean('is_verified').default(false),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const sessions = mysqlTable('sessions', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
  });
  
  const accounts = mysqlTable('account', {
    id: varchar('id', { length: 36 }).primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at').default(getDefaultTimestamp()),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at').default(getDefaultTimestamp()),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull().default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').notNull().default(getDefaultTimestamp()),
  });
  
  const documents = mysqlTable('documents', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 50 }),
    fileSize: varchar('file_size', { length: 20 }),
    status: varchar('status', { length: 50 }).default('uploaded'),
    processingStatus: varchar('processing_status', { length: 50 }),
    totalPages: varchar('total_pages', { length: 10 }),
    language: varchar('language', { length: 10 }),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const documentPages = mysqlTable('document_pages', {
    id: varchar('id', { length: 36 }).primaryKey(),
    documentId: varchar('document_id', { length: 36 }).notNull(),
    pageNumber: varchar('page_number', { length: 10 }).notNull(),
    pageText: text('page_text'),
    status: varchar('status', { length: 50 }).default('pending'),
    confidenceScore: varchar('confidence_score', { length: 10 }),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const documentMetadata = mysqlTable('document_metadata', {
    id: varchar('id', { length: 36 }).primaryKey(),
    documentId: varchar('document_id', { length: 36 }).notNull(),
    key: varchar('key', { length: 100 }).notNull(),
    value: text('value'),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const ocrTasks = mysqlTable('ocr_tasks', {
    id: varchar('id', { length: 36 }).primaryKey(),
    documentId: varchar('document_id', { length: 36 }).notNull(),
    status: varchar('status', { length: 50 }).default('pending'),
    errorMessage: text('error_message'),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const userSettings = mysqlTable('user_settings', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    key: varchar('key', { length: 100 }).notNull(),
    value: text('value'),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const apiKeys = mysqlTable('api_keys', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    key: varchar('key', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    isActive: boolean('is_active').default(true),
    lastUsedAt: timestamp('last_used_at'),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const usageStats = mysqlTable('usage_stats', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    documentCount: varchar('document_count', { length: 10 }).default('0'),
    pageCount: varchar('page_count', { length: 10 }).default('0'),
    date: varchar('date', { length: 10 }).notNull(),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  const fileStorage = mysqlTable('file_storage', {
    id: varchar('id', { length: 36 }).primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull().default(getDefaultTimestamp()),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  // Verification table required by Better Auth
  const verification = mysqlTable('verification', {
    id: varchar('id', { length: 36 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull().default(''),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull().default(''),
    value: text('value'),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').default(getDefaultTimestamp()),
    updatedAt: timestamp('updated_at').default(getDefaultTimestamp()),
  });
  
  return {
    users,
    sessions,
    accounts,
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
if (isSqlite) {
  schemaPromise = createSqliteSchema();
} else {
  schemaPromise = createMysqlSchema();
}

// 导出一个异步函数来获取schema
export async function getSchema() {
  return await schemaPromise;
}

// 为了保持向后兼容性，我们需要导出所有表
// 但由于是异步的，我们需要使用不同的方法
// 注意：使用这些导出的组件需要在异步上下文中

// 导出所有表的异步getter函数
export const getUsers = async () => (await getSchema()).users;
export const getSessions = async () => (await getSchema()).sessions;
export const getAccounts = async () => (await getSchema()).accounts;
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
export const users = schemaPromise.then(s => s.users);
export const sessions = schemaPromise.then(s => s.sessions);
export const accounts = schemaPromise.then(s => s.accounts);
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