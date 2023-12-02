import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import { CreateUserData } from "./types";

export default class UserRepository {
  static async getDetail(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username
      },
    });

    return user;
  }

  static async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
