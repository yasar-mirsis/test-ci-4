import { Request, Response, NextFunction } from 'express';

/**
 * Not Found Handler
 * Returns 404 status with JSON error message for undefined routes
 */
export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
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
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(405).setHeader('Content-Type', 'application/json').json({
    error: 'Method Not Allowed',
  });
};
