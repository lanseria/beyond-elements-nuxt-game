import type { PaginationParams } from '~/types'

export interface PaginationRecords<T> {
  count: number
  records: T
}
export function paginationReturning<T>(results: PaginationRecords<T>[], paginationQueryValue: PaginationParams) {
  const totalCount = results.length === 0 ? 0 : results[0].count
  const records = results.length === 0 ? [] : results.map(r => r.records)
  return {
    code: 0,
    data: {
      records,
      total: totalCount,
      pageSize: paginationQueryValue.pageSize,
      current: paginationQueryValue.current,
    },
  }
}
