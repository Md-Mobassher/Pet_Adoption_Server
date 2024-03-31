import z from "zod";

export const createUserValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});
