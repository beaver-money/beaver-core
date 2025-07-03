import { validateBody } from "@src/middleware/validate-body";
import { deleteUser, getUserById, updateUser } from "@src/resources/users/controller";
import { Router } from "express";
import { updateUserSchema } from "./schema";

import { requireSelf } from "@src/middleware/require-self";
import { asyncHandler } from "@src/utils/async-handler";

const router = Router();

router.get('/:id', asyncHandler(requireSelf), getUserById);
router.put('/:id', asyncHandler(requireSelf), validateBody(updateUserSchema), updateUser);
router.delete('/:id', asyncHandler(requireSelf), deleteUser);

export default router