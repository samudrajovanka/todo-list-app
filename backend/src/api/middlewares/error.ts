import { ErrorRequestHandler, Response as ExpressResponse, NextFunction, Request } from "express";
import NotFoundError from "../../exceptions/NotFoundError";
import Response from "../../lib/response";

export const notFound = (req: Request, res: ExpressResponse, next: NextFunction) => {
  next(new NotFoundError());
};

export const error = (err: ErrorRequestHandler, req: Request, res: ExpressResponse, next: NextFunction) => {
  return Response.error(res, err);
};
