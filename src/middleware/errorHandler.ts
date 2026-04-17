import { Request, Response, NextFunction } from 'express';

/**
 * Not Found Handler
 * Returns 404 status with JSON error message for undefined routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).setHeader('Content-Type', 'application/json').json({
    error: 'Not Found',
  });
};

/**
 * Method Not Allowed Handler
 * Returns 405 status with JSON error message when wrong HTTP method is used
 */
export const methodNotAllowedHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(405).setHeader('Content-Type', 'application/json').json({
    error: 'Method Not Allowed',
  });
};
