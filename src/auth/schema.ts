import { z } from "zod/v4";

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export type AuthInput = z.infer<typeof authSchema>;
