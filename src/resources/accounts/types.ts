import { InferSelectModel } from "drizzle-orm"
import { AccountMembershipsTable, AccountsTable } from "./schema"

export type Account = InferSelectModel<typeof AccountsTable>
export type NewAccount = Partial<Omit<Account, 'id' | 'primaryUserId'>> & Pick<Account, 'name' | 'primaryUserId'>
export type UpdateAccount = Partial<NewAccount> & Pick<Account, 'id'>
export type DeleteAccount = Pick<Account, 'id'>

export type AccountMembership = InferSelectModel<typeof AccountMembershipsTable>
export type NewAccountMembership = Partial<Omit<AccountMembership, 'accountId' | 'userId'>> & Pick<AccountMembership, 'role' | 'accountId' | 'userId'>
export type UpdateAccountMembership = Partial<Omit<NewAccountMembership, 'accountId' | 'userId'>> & Pick<AccountMembership, 'accountId' | 'userId'>
export type DeleteAccountMembership = Pick<AccountMembership, 'accountId' | 'userId'>