import { Config } from './types';

/**
 * Default configuration values.
 */
const DEFAULT_PORT = 3000;
const DEFAULT_NODE_ENV = 'development';

/**
 * Validates that a port number is within the valid range (1-65535).
 * @param port - The port number to validate
 * @returns true if the port is valid, false otherwise
 */
function isValidPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/**
 * Parses and validates the port from environment variables.
 * Falls back to the default port if the environment variable is invalid.
 * @param envPort - The port value from process.env.PORT
 * @returns A valid port number
 */
function parsePort(envPort: string | undefined): number {
  if (envPort === undefined || envPort.trim() === '') {
    return DEFAULT_PORT;
  }

  const parsedPort = parseInt(envPort, 10);

  if (isNaN(parsedPort) || !isValidPort(parsedPort)) {
    console.warn(
      `Invalid port "${envPort}" in environment variable. Using default port ${DEFAULT_PORT}.`
    );
    return DEFAULT_PORT;
  }

  return parsedPort;
}

/**
 * Parses the Node.js environment from environment variables.
 * @param envNodeEnv - The environment value from process.env.NODE_ENV
 * @returns A valid environment string
 */
function parseNodeEnv(envNodeEnv: string | undefined): string {
  if (envNodeEnv === undefined || envNodeEnv.trim() === '') {
    return DEFAULT_NODE_ENV;
  }

  return envNodeEnv.trim();
}

/**
 * Returns the validated application configuration.
 * Reads from environment variables and applies sensible defaults.
 * @returns A Config object with validated settings
 */
export function getConfig(): Config {
  const port = parsePort(process.env.PORT);
  const nodeEnv = parseNodeEnv(process.env.NODE_ENV);

  return {
    port,
    nodeEnv,
  };
}

export { Config };
