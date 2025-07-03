import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { UsersTable } from "../resources/users/schema";
import { AccountMembershipsTable, AccountsTable } from "../resources/accounts/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({
  client: pool,
  schema: {
    users: UsersTable,
    accounts: AccountsTable,
    account_memberships: AccountMembershipsTable
  }
});