import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { UsersTable } from "../resources/users/schema";
import { AccountMembershipsTable, AccountsTable } from "../resources/accounts/schema";
import { accountsRelations, accountMembershipsRelations } from "../resources/accounts/schema";
import { usersRelations } from "../resources/users/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const schema = {
  users: UsersTable,
  usersRelations,

  accounts: AccountsTable,
  account_memberships: AccountMembershipsTable,
  accountsRelations,
  accountMembershipsRelations

}

export const db = drizzle({
  client: pool,
  schema
});