import { relations, sql } from 'drizzle-orm'
import { boolean, customType, index, integer, jsonb, pgSchema, text, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

const NANO_ID_LENGTH = 21
const ADOC_NANO_ID_LENGTH = 12

export const nitroSchema = pgSchema('beyond-elements')

export const genders = nitroSchema.enum('genders', ['male', 'female'])
export const roles = nitroSchema.enum('roles', ['admin', 'user'])
export const status = nitroSchema.enum('status', ['todo', 'doing', 'done'])
const formattedTimestamp = customType<{ data: number, driverData: string }>({
  dataType() {
    return 'timestamp'
  },
  toDriver(value: number): string {
    return dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss')
  },
  fromDriver(value: string): number {
    return dayjs(value).unix()
  },
})
/**
 * 用户表
 */
export const users = nitroSchema.table('users', {
  id: varchar('id', {
    length: NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(NANO_ID_LENGTH)),
  name: text('name'),
  avatar: text('avatar'),
  username: text('username').unique(),
  password: text('password').notNull(),
  gender: genders('gender').default('male'),
  role: roles('role').default('user'),
  createdAt: formattedTimestamp('created_at').notNull().default(sql`now()`),
  updatedAt: formattedTimestamp('updated_at').default(sql`now()`).$onUpdate(() => dayjs().unix()),
})
/**
 * 登录记录
 */
export const loginRecords = nitroSchema.table('login_records', {
  id: varchar('id', {
    length: NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(NANO_ID_LENGTH)),
  userId: text('user_id').notNull(),
  password: text('password'),
  passwordHash: text('password_hash'),
  isLogin: boolean('is_login').default(false),
  ip: text('ip'),
  createdAt: formattedTimestamp('created_at').notNull().default(sql`now()`),
})
/**
 * 邀请码
 */
export const inviteCodes = nitroSchema.table('invite_codes', {
  id: varchar('id', {
    length: NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(NANO_ID_LENGTH)),
  userId: text('user_id'),
  code: text('code').notNull().unique(),
  isUsed: boolean('is_used').notNull().default(false),
  usedAt: formattedTimestamp('used_at'),
  createdAt: formattedTimestamp('created_at').notNull().default(sql`now()`),
})
/**
 * 字典
 */
export const dicts = nitroSchema.table('dicts', {
  id: varchar('id', {
    length: NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(NANO_ID_LENGTH)),
  label: text('label').notNull(),
  value: text('value').notNull(),
  createdAt: formattedTimestamp('created_at').notNull().default(sql`now()`),
  updatedAt: formattedTimestamp('updated_at').default(sql`now()`).$onUpdate(() => dayjs().unix()),
})
/**
 * 字典项
 */
export const dictItems = nitroSchema.table('dict_items', {
  id: varchar('id', {
    length: NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(NANO_ID_LENGTH)),
  dictId: text('dict_id').notNull().references(() => dicts.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  value: text('value').notNull(),
  sort: integer('sort').notNull().default(0),
  description: text('description'),
  createdAt: formattedTimestamp('created_at').notNull().default(sql`now()`),
  updatedAt: formattedTimestamp('updated_at').default(sql`now()`).$onUpdate(() => dayjs().unix()),
})
/**
 * 省级（省份、直辖市、自治区）
 */
export const provinces = nitroSchema.table('provinces', {
  code: varchar('code', {
    length: ADOC_NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(ADOC_NANO_ID_LENGTH)),
  name: text('name').notNull(),
})
/**
 * 地级（城市）
 */
export const cities = nitroSchema.table('cities', {
  code: varchar('code', {
    length: ADOC_NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(ADOC_NANO_ID_LENGTH)),
  name: text('name').notNull(),
  provinceCode: text('province_code').notNull().references(() => provinces.code, { onDelete: 'cascade' }),
})
/**
 * 县级（区县）
 */
export const areas = nitroSchema.table('areas', {
  code: varchar('code', {
    length: ADOC_NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(ADOC_NANO_ID_LENGTH)),
  name: text('name').notNull(),
  cityCode: text('city_code').notNull().references(() => cities.code, { onDelete: 'cascade' }),
  provinceCode: text('province_code').notNull().references(() => provinces.code, { onDelete: 'cascade' }),
})
/**
 * 乡级（乡镇、街道）
 */
export const streets = nitroSchema.table('streets', {
  code: varchar('code', {
    length: ADOC_NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(ADOC_NANO_ID_LENGTH)),
  name: text('name').notNull(),
  areaCode: text('area_code').notNull().references(() => areas.code, { onDelete: 'cascade' }),
  cityCode: text('city_code').notNull().references(() => cities.code, { onDelete: 'cascade' }),
  provinceCode: text('province_code').notNull().references(() => provinces.code, { onDelete: 'cascade' }),
})
/**
 * 村级（村委会、居委会）
 */
export const villages = nitroSchema.table('villages', {
  code: varchar('code', {
    length: ADOC_NANO_ID_LENGTH,
  }).primaryKey().$defaultFn(() => nanoid(ADOC_NANO_ID_LENGTH)),
  name: text('name').notNull(),
  streetCode: text('street_code').notNull().references(() => streets.code, { onDelete: 'cascade' }),
  areaCode: text('area_code').notNull().references(() => areas.code, { onDelete: 'cascade' }),
  cityCode: text('city_code').notNull().references(() => cities.code, { onDelete: 'cascade' }),
  provinceCode: text('province_code').notNull().references(() => provinces.code, { onDelete: 'cascade' }),
})
/**
 * 用户关联
 * 用户 一对多 登录记录
 * 用户 一对一 邀请码
 */
export const usersRelations = relations(users, ({ many, one }) => ({
  loginRecords: many(loginRecords),
  inviteCode: one(inviteCodes),
}))
/**
 * 登录记录关联
 * 登录记录 多对一 用户
 */
export const loginRecordsRelations = relations(loginRecords, ({ one }) => ({
  user: one(users, {
    fields: [loginRecords.userId],
    references: [users.id],
  }),
}))
/**
 * 邀请码关联
 * 邀请码 一对一 用户
 */
export const inviteCodesRelations = relations(inviteCodes, ({ one }) => ({
  user: one(users, {
    fields: [inviteCodes.userId],
    references: [users.id],
  }),
}))
/**
 * 字典关联
 * 字典 一对多 字典项
 */
export const dictsRelations = relations(dicts, ({ many }) => ({
  children: many(dictItems),
}))
/**
 * 字典项关联
 * 字典项 多对一 字典
 */
export const dictItemsRelations = relations(dictItems, ({ one }) => ({
  dict: one(dicts, {
    fields: [dictItems.dictId],
    references: [dicts.id],
  }),
}))
