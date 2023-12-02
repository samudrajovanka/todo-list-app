import { Response as ExpressResponse, ErrorRequestHandler } from "express";
import { SERVER_ERR } from "../../constants/errorType";
import ClientError from "../../exceptions/ClientError";
import { SuccessResponseArgs } from "./types";

export default class Response {
  static success({
    message,
    data,
    ...rest
  }: SuccessResponseArgs) {
    if (data) {
      return {
        success: true,
        message,
        data,
        ...rest,
      };
    }
  
    return {
      success: true,
      message,
      ...rest,
    };
  }

  private static clientError(error: ClientError) {
    return {
      success: false,
      message: error.message,
      type: error.type,
    }
  }

  private static serverError(error: Error) {
    return {
      success: false,
      message: error.message,
      type: SERVER_ERR,
      error: process.env.NODE_ENV !== "production" ? error.stack : undefined,
    }
  }

  static error(res: ExpressResponse, error: ErrorRequestHandler) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json(this.clientError(error));
    }
  
    return res.status(500).json(this.serverError(error as unknown as Error));
  }
}
