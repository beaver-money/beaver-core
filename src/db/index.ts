import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { UsersTable } from "./schema/users";
import { AccountsTable } from "./schema/accounts";
import { AccountMembershipsTable } from "./schema/account-memberships";

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