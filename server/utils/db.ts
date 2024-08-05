// server/utils/db.ts
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg' // <-
import * as schema from '~/server/database/schemas'

let _db: NodePgDatabase<typeof schema> | null = null

export async function usePgDatabase() {
  if (!_db) {
    const config = useRuntimeConfig()
    const client2 = new pg.Client({ // <-
      connectionString: config.dbUrl,
    })
    await client2.connect()
    _db = drizzle(client2, {
      schema,
    })
  }

  return _db
}
