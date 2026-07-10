import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: 'Internal server error' });
};
