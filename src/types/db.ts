import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { AccountMembershipsTable } from "@src/db/schema/account-memberships"
import { AccountsTable } from "@src/db/schema/accounts"
import { UsersTable } from "@src/db/schema/users"

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable>
export type UpdateUser = Partial<NewUser> & Pick<User, 'id'>
export type DeleteUser = Pick<User, 'id'>

export type Account = InferSelectModel<typeof AccountsTable>
export type NewAccount = InferInsertModel<typeof AccountsTable>
export type UpdateAccount = Partial<NewAccount> & Pick<Account, 'id'>
export type DeleteAccount = Pick<Account, 'id'>

export type AccountMembership = InferSelectModel<typeof AccountMembershipsTable>
export type NewAccountMembership = InferInsertModel<typeof AccountMembershipsTable>
export type UpdateAccountMembership = Partial<Omit<NewAccountMembership, 'accountId' | 'userId'>> & Pick<AccountMembership, 'accountId' | 'userId'>
export type DeleteAccountMembership = Pick<AccountMembership, 'accountId' | 'userId'>