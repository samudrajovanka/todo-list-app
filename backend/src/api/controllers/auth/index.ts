import { NextFunction, Request, Response as ExpressResponse } from "express";
import AuthValidation from "../../../validations/auth";
import AuthService from "../../../services/auth";
import Response from "../../../lib/response";

export default class AuthController {
  static async register(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new AuthValidation(req.body).validateRegister();

      const newUser = await AuthService.register(req.body);

      return res.status(201).json(
        Response.success({
          message: "Registration successfully",
          data: {
            user: newUser
          }
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: ExpressResponse, next: NextFunction) {
    try {
      new AuthValidation(req.body).validateLogin();

      const loginToken = await AuthService.login(req.body);

      return res.status(200).json(
        Response.success({
          message: "Login success",
          data: loginToken
        })
      )
    } catch (err) {
      next(err);
    }
  }
}
