import { Request, Response } from 'express';
import { HelloResponse } from './types';

/**
 * GET /hello endpoint handler
 * Returns a JSON greeting message with HTTP status 200
 */
export function helloHandler(req: Request, res: Response<void, HelloResponse>): void {
  const response: HelloResponse = {
    message: 'Hello, World!',
  };

  res.status(200).json(response);
}
