import * as bcrypt from "bcrypt";
import { Request } from "express";
import { User } from "@prisma/client";
import prisma from "../../shared/prisma";

const createUserIntoDb = async (req: Request): Promise<Partial<User>> => {
  const hasedPassword: string = await bcrypt.hash(req.body.password, 12);

  const result = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getUserInfo = async (userId: string): Promise<Partial<User>> => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserInfo = async (
  userId: string,
  data: Partial<User>
): Promise<Partial<User>> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const UserServices = {
  createUserIntoDb,
  getUserInfo,
  updateUserInfo,
};
