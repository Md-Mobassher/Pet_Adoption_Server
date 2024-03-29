import { Pet, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import { petSearchAbleFields } from "./pet.constant";
import { IPaginationOptions } from "../../interface/iPaginationOptions";

const createAPet = async (payload: Pet): Promise<Pet> => {
  const result = await prisma.pet.create({
    data: payload,
  });

  return result;
};

const getFilteredPet = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.PetWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.PetWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.pet.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PetServices = {
  createAPet,
  getFilteredPet,
};
