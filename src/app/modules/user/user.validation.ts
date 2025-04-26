import z from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  imageUrl: z.string().optional(),
  phone: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
});

export const changeUserStatus = z.object({
  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["DEACTIVE", "ACTIVE", "DELETED"]),
});
