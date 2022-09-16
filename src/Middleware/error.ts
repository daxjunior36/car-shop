import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

function middlewareError(
  err:Error | ZodError,
  req: Request,
  res:Response,
  _next:NextFunction,

) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  return res.status(500).json({ message: err.message });
}

export default middlewareError;