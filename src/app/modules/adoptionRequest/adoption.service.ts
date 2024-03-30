import { AdoptionRequest } from "@prisma/client";
import prisma from "../../shared/prisma";

const createAdoptionIntoDb = async (
  userId: string,
  payload: {
    petId: string;
    petOwnershipExperience: string;
  }
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: payload.petId,
    },
  });

  const result = await prisma.adoptionRequest.create({
    data: {
      userId: userId,
      petId: payload.petId,
      petOwnershipExperience: payload.petOwnershipExperience,
    },
  });

  return result;
};

export const AdoptionServices = {
  createAdoptionIntoDb,
};
