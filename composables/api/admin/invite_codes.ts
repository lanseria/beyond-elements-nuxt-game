import type { InviteCodesBatchGenerateRecord, InviteCodesPaginationQuery, InviteCodesQuery, InviteCodesRecord, R_List, R_P, R_Pagination } from '~/types'

export function initInviteCodesBatchGenerateRecord(): InviteCodesBatchGenerateRecord {
  return {
    quantity: 1,
  }
}

export function initInviteCodesQuery(): InviteCodesQuery {
  return {
  }
}

export function queryInviteCodesPage(query: InviteCodesPaginationQuery): R_Pagination<InviteCodesRecord> {
  return $fetch('/api/admin/invite_codes/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function postInviteCodesBatchGenerate(body: InviteCodesBatchGenerateRecord): R_List<InviteCodesRecord> {
  return $fetch('/api/admin/invite_codes/batch_generate', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteInviteCodes(body: string[]): R_P<InviteCodesRecord[]> {
  return $fetch('/api/admin/invite_codes', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteInviteCodesById(data: string): R_P<InviteCodesRecord[]> {
  return deleteInviteCodes([data])
}
