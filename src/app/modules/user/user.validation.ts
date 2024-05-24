import z from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});
