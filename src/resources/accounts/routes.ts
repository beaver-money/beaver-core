import { Router } from "express";
import { createAccount, deleteAccount, addMember } from "./controller";
import { asyncHandler } from "@utils/async-handler";
import { validateBody } from "@src/middleware/validate-body";
import { requireRole } from "@src/middleware/require-role";
import { createAccountSchema, createMembershipSchema } from "./schema";

const router = Router();

router.post("/", validateBody(createAccountSchema), asyncHandler(createAccount));
router.delete("/:accountId", requireRole("OWNER"), asyncHandler(deleteAccount));
router.post("/:accountId/members", requireRole("OWNER"), validateBody(createMembershipSchema), asyncHandler(addMember));

export default router;
