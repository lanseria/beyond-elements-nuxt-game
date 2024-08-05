import { inArray } from 'drizzle-orm'
import { inviteCodes } from '../database/schemas'

export async function inviteCodesInit(ids: string[]) {
  if (ids.length === 0) {
    return []
  }
  const db = await usePgDatabase()
  const updatedList = await db.update(inviteCodes)
    .set({ userId: null, isUsed: false, usedAt: null })
    .where(inArray(inviteCodes.id, ids))
    .returning()
  return updatedList
}
