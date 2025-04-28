import { adoptionStatus, Favorite, User, UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";

const createAdoptionIntoDb = async (
  userId: string,
  payload: {
    petId: string;
    petOwnershipExperience: string;
  }
): Promise<Favorite> => {
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

  const result = await prisma.favorite.create({
    data: {
      userId: userId,
      petId: payload.petId,
    },
  });

  return result;
};

const getMyFavourite = async (userId: string): Promise<Favorite[]> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    include: {
      pet: true,
    },
  });

  return result;
};

const getAllFavourite = async (userId: string): Promise<Favorite[]> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.favorite.findMany({
    include: {
      pet: true,
      user: true,
    },
  });

  return result;
};

const deleteFavouriteStatus = async (
  userId: string,
  requestId: string
): Promise<Favorite> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      role: UserRole.ADMIN || UserRole.SUPER_ADMIN,
    },
  });

  await prisma.favorite.findUniqueOrThrow({
    where: {
      id: requestId,
    },
  });

  const result = await prisma.favorite.delete({
    where: {
      id: requestId,
    },
  });

  return result;
};

export const FavouriteServices = {
  createAdoptionIntoDb,
  getMyFavourite,
  getAllFavourite,
  deleteFavouriteStatus,
};
