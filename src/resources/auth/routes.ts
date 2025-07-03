import { validateBody } from "@src/middleware/validate-body";
import { Router } from "express";
import passport from "passport";
import { createUserSchema } from "../users/schema";
import { login, signup } from "./controller";

const router = Router();

router.post("/signup", validateBody(createUserSchema), signup);
router.post("/login", passport.authenticate("local", { session: false }), login);

export default router;