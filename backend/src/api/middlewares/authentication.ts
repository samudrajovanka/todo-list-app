import { NextFunction, Request, Response } from "express";
import AuthenticationError from "../../exceptions/AuthenticationError";
import { TokenManager } from "../../lib/tokenManager";
import { AccessTokenPayload } from "../../lib/tokenManager/types";
import UserRepository from "../../repositories/user";
import { User } from "@prisma/client";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers?.authorization;

    if (!bearerToken) {
      throw new AuthenticationError();
    }

    const token = bearerToken.split(" ")[1];

    const { username } = TokenManager.decodeToken<AccessTokenPayload>(token, process.env.ACCESS_TOKEN_SECRET_KEY!);

    const user = await UserRepository.getDetail(username);

    if (!user) {
      throw new AuthenticationError();
    }

    delete (user as Partial<User>).password;

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
