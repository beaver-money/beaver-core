import { AccountMembershipsTable } from "@src/db/schema/account-memberships"
import { AccountsTable } from "@src/db/schema/accounts"
import { UsersTable } from "@src/db/schema/users"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable>

export type Account = InferSelectModel<typeof AccountsTable>
export type NewAccount = InferInsertModel<typeof AccountsTable>

export type AccountMembership = InferSelectModel<typeof AccountMembershipsTable>
export type NewAccountMembership = InferInsertModel<typeof AccountMembershipsTable>
