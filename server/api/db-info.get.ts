import { db, dbType, isSqlite, getD1DB } from '~/server/database/database';
import type {D1Database} from "@cloudflare/workers-types";
import {drizzle as drizzleD1} from "drizzle-orm/d1/driver";
import * as schema from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const cf = event.context?.cloudflare as { env: { DB: D1Database } } | undefined;
    if (!cf?.env?.DB) {
      throw new Error('D1绑定"DB"未找到');
    }
    drizzleD1(cf.env.DB, { schema });
    
    return {
      status: 'success',
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      status: 'error',
      timestamp: new Date().toISOString()
    };
  }
});