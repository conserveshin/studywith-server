import { NextFunction, Request, Response } from "express";

const asyncWrapper = <T>(
  body: ((req: Request, res: Response, next: NextFunction) => void)
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await body(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  }
};

export default asyncWrapper;