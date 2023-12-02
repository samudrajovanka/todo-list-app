import { Prisma } from "@prisma/client";
import NotFoundError from "../../exceptions/NotFoundError";
import { PrismaCodeError } from "../../types/prisma";

export const prismaErrorHandling = (error: unknown, objective = "Data") => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaCodeError.ProcessFailDataNotExist:
        throw new NotFoundError(`Proses failed becase ${objective} not found`);
      default:
        throw error;
    }
  }

  throw error;
};
