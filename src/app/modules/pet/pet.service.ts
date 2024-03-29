import { Request } from "express";
import { Pet } from "@prisma/client";
import prisma from "../../shared/prisma";

const createAPet = async (payload: Pet): Promise<Pet> => {
  const result = await prisma.pet.create({
    data: payload,
  });

  return result;
};

export const PetServices = {
  createAPet,
};
