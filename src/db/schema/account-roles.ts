import { pgEnum } from "drizzle-orm/pg-core";

export const AccountRoles = pgEnum('account_roles', [
    'EDITOR',
    'VIEWER',
])