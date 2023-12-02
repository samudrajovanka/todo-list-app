import jwt from "jsonwebtoken";

export type CreateTokenArgs = {
  payload: jwt.JwtPayload;
  secret: jwt.Secret;
  options?: jwt.SignOptions;
};

export type AccessTokenPayload = {
  id: string;
  username: string;
};

export enum TokenType {
  LoginToken
}

export type ExecuteArgs = {
  type?: TokenType
};

export type LoginToken = {
  accessToken: string
}

export type ExecuteReturn = LoginToken;
