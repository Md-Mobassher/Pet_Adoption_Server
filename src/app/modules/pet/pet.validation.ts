import { z } from "zod";

export const createPetValidationSchema = z.object({
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  age: z.number().int().positive(),
  size: z.string(),
  location: z.string(),
  description: z.string(),
  temperament: z.string(),
  medicalHistory: z.string(),
  adoptionRequirements: z.string(),
});

export const updatePetValidationSchema = z.object({
  name: z.string().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  age: z.number().int().positive().optional(),
  size: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  temperament: z.string().optional(),
  medicalHistory: z.string().optional(),
  adoptionRequirements: z.string().optional(),
});
