import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
