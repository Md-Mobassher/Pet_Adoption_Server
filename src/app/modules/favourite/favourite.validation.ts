import { z } from "zod";

export const createFavouriteValidationSchema = z.object({
  petId: z.string().uuid({
    message: "Invalid pet ID format",
  }),
});

export const updateFavouriteValidationSchema = z.object({
  status: z.string(),
});
