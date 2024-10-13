import {
  AdoptionRequest,
  adoptionStatus,
  User,
  UserRole,
} from "@prisma/client";
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

const getMyAdoptionRequest = async (
  userId: string
): Promise<AdoptionRequest[]> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: userId,
    },
    include: {
      pet: true,
    },
  });

  return result;
};

const getAllAdoptionRequest = async (
  userId: string
): Promise<AdoptionRequest[]> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.adoptionRequest.findMany({
    include: {
      pet: true,
      user: true,
    },
  });

  return result;
};

const updateAdoptionRequestStatus = async (
  userId: string,
  requestId: string,
  data: {
    status: adoptionStatus;
  }
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      role: UserRole.ADMIN || UserRole.SUPER_ADMIN,
    },
  });

  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id: requestId,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data,
  });

  return result;
};

export const AdoptionServices = {
  createAdoptionIntoDb,
  getMyAdoptionRequest,
  getAllAdoptionRequest,
  updateAdoptionRequestStatus,
};
