import { Router } from "express";
import { createAccount, deleteAccount, addMember } from "./controller";
import { asyncHandler } from "@utils/async-handler";
import { validateBody } from "@src/middleware/validate-body";
import { requireAccountOwner } from "./utils";
import { createAccountSchema, createMembershipSchema } from "./schema";

const router = Router();

router.post("/", validateBody(createAccountSchema), asyncHandler(createAccount));
router.delete("/:accountId", requireAccountOwner, asyncHandler(deleteAccount));
router.post("/:accountId/members", requireAccountOwner, validateBody(createMembershipSchema), asyncHandler(addMember));

export default router;
