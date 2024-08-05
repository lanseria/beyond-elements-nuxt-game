export interface Pagination {
  total: number
  pageSize: number
  current: number
}

export interface PaginationRecordsRes<T> extends Pagination {
  records: T[]
}
export interface R<T> {
  code: number
  msg: string
  data: T
}

export interface PaginationParams {
  current: number
  pageSize: number
}

export interface R_Pagination<T> extends Promise<R<PaginationRecordsRes<T>>> {}

export interface R_List<T> extends Promise<R<T[]>> {}

export interface R_Tree<T> extends Promise<R<T[]>> {}

export interface R_P<T> extends Promise<R<T>> {}

export interface LabelValue {
  label: string
  value: string
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  inviteCode: string
  username: string
  password: string
  confirmPassword: string
}

export interface TaskRecord {
  name: string
  percent: number
  activeCount: number
  pendingCount: number
  status: 'success' | 'error'
  successMessage: string
  errorMessage: string
}
// 定义树节点的接口
export interface DictTreeNode {
  id: string
  label: string
  value: string
  // 添加其他字典字段
  children?: DictTreeNode[]
}
/**
 * 用户
 */
export interface UserRecord {
  id: string
  name: string
  avatar: string
  username: string
  password: string
  gender: string
  role: string
  createdAt?: number
  updatedAt?: number
}

export interface UsersQuery {
  username: string
  name: string
}

export interface UsersPaginationQuery extends PaginationParams, UsersQuery {}

export interface LoginRecordsRecord {
  id: string
  userId: string
  username: string
  name: string
  isLogin: boolean
  ip: string
  createdAt: number
}
export interface LoginRecordsQuery {
  username: string
  name: string
}

export interface LoginRecordsPaginationQuery extends PaginationParams, LoginRecordsQuery {}

export interface InviteCodesRecord {
  id: string
  userId: string | null
  code: string
  isUsed: boolean
  usedAt: number | null
  createdAt: number
}

export interface InviteCodesBatchGenerateRecord {
  quantity: number
}

export interface InviteCodesQuery {
  isUsed?: boolean
}

export interface InviteCodesPaginationQuery extends PaginationParams, InviteCodesQuery {}

export interface DictRecord {
  id: string
  label: string
  value: string
  createdAt: number
  updatedAt: number
}
// 子字典
export interface DictItemsRecord {
  id: string
  dictId: string
  label: string
  value: string
  sort: number
  description: string
  createdAt: number
  updatedAt: number
}

export interface DictItemsQuery {
  dictId: string
}

export interface ProvincesRecord {
  code: string
  name: string
}

export interface CitiesRecord {
  code: string
  name: string
  provinceCode: string
}

export interface AreasRecord {
  code: string
  name: string
  cityCode: string
  provinceCode: string
}

export interface StreetsRecord {
  code: string
  name: string
  areaCode: string
  cityCode: string
  provinceCode: string
}

export interface VillagesRecord {
  code: string
  name: string
  streetCode: string
  areaCode: string
  cityCode: string
  provinceCode: string
}
