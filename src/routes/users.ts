import { db } from "@src/db";
import { UsersTable } from "@src/db/schema/users";
import { NewUser, User } from "@src/types/db";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers: User[] = await db.query.users.findMany()
        res.json(allUsers)
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user: User | undefined = await db.query.users.findFirst({
            where: eq(UsersTable.id, userId)
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/', async (req: Request, res: Response) => {
    const newUser = req.body as NewUser
    console.log({ newUser })
    try {
        const [insertedUser] = await db.insert(UsersTable).values(newUser).returning();
        res.status(201).json(insertedUser);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router