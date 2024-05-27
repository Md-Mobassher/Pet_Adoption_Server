import { Pet, Prisma, UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import { petSearchAbleFields } from "./pet.constant";
import { IPaginationOptions } from "../../interface/iPaginationOptions";
import { IUploadFile } from "../../interface/file";
import { FileUploadHelper } from "../../helper/fileUploadHelper";

const createAPet = async (req: Record<string, any>): Promise<Pet> => {
  const file = req.file as IUploadFile;

  if (file) {
    const uploadPet = await FileUploadHelper.uploadToCloudinary(file);
    req.body.image = uploadPet?.secure_url;
  }
  const result = await prisma.pet.create({
    data: req.body,
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

  const whereConditons: Prisma.PetWhereInput = { AND: andCondions };

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

const getAPet = async (petId: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
      isDeleted: false,
    },
  });

  return result;
};

const updateAPet = async (petId: string, data: Partial<Pet>): Promise<Pet> => {
  await prisma.pet.findFirstOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
  });

  return result;
};

const deleteAPet = async (petId: string): Promise<Pet> => {
  await prisma.pet.findFirstOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const PetServices = {
  createAPet,
  getFilteredPet,
  getAPet,
  updateAPet,
  deleteAPet,
};
