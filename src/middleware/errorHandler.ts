import { error } from "console";
import type { Request, Response, NextFunction } from "express";
import { WrapperError } from "../types/errors";

const errorHandler = (debug: boolean) => {
  return (
    err: unknown, req: Request, res: Response, next: NextFunction
  ) => {
    if (err instanceof WrapperError) {
      res.status(err.statusCode)
    } else {
      res.status(500);
    }

    if (err instanceof Error) {
      if (debug) 
        res.send({ stack: err.stack });
      else
        res.send({ message: err.message });
    }
  }
}


export default errorHandler;