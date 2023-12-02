import bcrypt from "bcrypt";

import { CONFLICT_ERR } from "../../constants/errorType";
import ClientError from "../../exceptions/ClientError";
import UserRepository from "../../repositories/user";
import { CreateUserData } from "../../repositories/user/types";
import { LoginData } from "./types";
import AuthenticationError from "../../exceptions/AuthenticationError";
import { TokenManager } from "../../lib/tokenManager";
import { AccessTokenPayload, TokenType } from "../../lib/tokenManager/types";
import { User } from "@prisma/client";

export default class AuthService {
  static async register(data: CreateUserData) {
    const user = await UserRepository.getDetail(data.username);

    if (user) {
      throw new ClientError('Username already exists', { statusCode: 409, type: CONFLICT_ERR });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await UserRepository.create({
      username: data.username,
      password: hashedPassword.toString()
    });

    delete (newUser as Partial<User>).password;

    return newUser;
  }

  static async login(data: LoginData) {
    const user = await UserRepository.getDetail(data.username);

    if (!user) {
      throw new AuthenticationError("Username or password incorret");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new AuthenticationError("Username or password incorret");
    }

    const tokenPayload: AccessTokenPayload = {
      id: user.id,
      username: user.username
    }
    const loginToken = new TokenManager(tokenPayload).execute({ type: TokenType.LoginToken });

    return loginToken;
  }
}
