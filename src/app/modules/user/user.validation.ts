import z from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const changeUserStatus = z.object({
  id: z.string().uuid(),
  status: z.enum(["DEACTIVE", "ACTIVE", "DELETED"]),
});

export const changeUserRole = z.object({
  id: z.string().uuid(),
  role: z.enum(["ADMIN", "USER"]),
});
