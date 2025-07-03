import { validateBody } from "@src/middleware/validate-body";
import { deleteUser, getUserById, getUsers, updateUser } from "@src/resources/users/controller";
import { Router } from "express";
import { updateUserSchema } from "./schema";
import passport from "passport";
import { requireSelf } from "@src/middleware/require-self";

const router = Router();

router.get('/', getUsers)
router.get('/:id', passport.authenticate('jwt', { session: false }), requireSelf, getUserById);
router.put('/:id', passport.authenticate('jwt', { session: false }), requireSelf, validateBody(updateUserSchema), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), requireSelf, deleteUser);

export default router