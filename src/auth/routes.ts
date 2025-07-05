import { Router } from "express";

import { validateBody } from "../middleware/validate-body";
import { login, signup } from "./controller";
import { loginSchema, signUpSchema } from "./schema";

const router = Router();

router.post("/signup", validateBody(signUpSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;