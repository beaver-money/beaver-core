import { validateBody } from "@src/middleware/validate-body";
import { deleteUser, getUserById, updateUser } from "@src/resources/users/controller";
import { Router } from "express";
import { updateUserSchema } from "./schema";

import { requireSelf } from "@src/middleware/require-self";

const router = Router();

router.get('/:id', requireSelf, getUserById);
router.patch('/:id', requireSelf, validateBody(updateUserSchema), updateUser);
router.delete('/:id', requireSelf, deleteUser);

export default router