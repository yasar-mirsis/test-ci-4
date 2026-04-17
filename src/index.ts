import express, { Application, Request, Response } from 'express';
import http, { Server } from 'http';
import { corsMiddleware } from './middleware/cors';
import { notFoundHandler } from './middleware/errorHandler';
import { helloHandler } from './routes/hello';
import { getConfig } from './config';

/**
 * Creates and configures the Express application instance.
 * Registers middleware (CORS, JSON parsing), route handlers, and error handlers.
 * @returns A configured Express application instance
 */
export function createApp(): Application {
  const app = express();

  // Register CORS middleware first
  app.use(corsMiddleware);

  // Register JSON body parser middleware
  app.use(express.json());

  // Register route handlers
  app.get('/hello', helloHandler);

  // Register method not allowed handler for /hello with wrong methods
  app.all('/hello', (req: Request, res: Response) => {
    if (req.method !== 'GET') {
      res.status(405).setHeader('Content-Type', 'application/json').json({
        error: 'Method Not Allowed',
      });
    }
  });

  // Register error handlers after all routes
  app.use(notFoundHandler);

  return app;
}

/**
 * Starts the HTTP server on the specified port.
 * Handles errors when the port is already in use.
 * @param port - The port number to bind the server to
 * @returns A Promise that resolves with the HTTP server instance
 */
export function startServer(port: number): Promise<Server> {
  const app = createApp();
  const server = http.createServer(app);
  
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });

    // Handle port binding errors
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Error: Port ${port} is already in use.`);
        reject(err);
      } else {
        console.error(`Server error: ${err.message}`);
        reject(err);
      }
    });
  });
}

/**
 * Handles graceful shutdown of the server.
 * Listens to SIGTERM and SIGINT signals, closes the server gracefully
 * with a 10-second timeout.
 * @param server - The HTTP server instance to shut down
 */
export function handleGracefulShutdown(server: Server): void {
  const shutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);

    server.close((err?: Error) => {
      if (err) {
        console.error('Error during graceful shutdown:', err.message);
        process.exit(1);
      }

      console.log('Server closed gracefully.');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown after 10 seconds timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

// If this file is run directly, start the server
const config = getConfig();

if (require.main === module) {
  startServer(config.port)
    .then((server) => {
      handleGracefulShutdown(server);
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}

// Export for testing purposes
export default createApp;
