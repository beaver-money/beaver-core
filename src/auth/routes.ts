import { Router } from "express";

import { signup, login } from "./controller";
import { validateBody } from "../middleware/validate-body";
import { authSchema } from "./schema";

const router = Router();

router.post("/signup", validateBody(authSchema), signup);
router.post("/login", validateBody(authSchema), login);

export default router;