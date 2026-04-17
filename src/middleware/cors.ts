import { Request, Response, NextFunction } from 'express';

/**
 * CORS middleware that enables Cross-Origin Resource Sharing for all requests.
 * Sets the following headers on all responses:
 * - Access-Control-Allow-Origin: *
 * - Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
 * - Access-Control-Allow-Headers: Content-Type, Authorization
 * 
 * Handles preflight OPTIONS requests by returning 200 with appropriate headers and no body.
 */
export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Set CORS headers on all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Continue to next middleware/handler
  next();
}

export default corsMiddleware;
