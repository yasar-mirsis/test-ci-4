/**
 * Configuration interface defining the application settings.
 */
export interface Config {
  /** Server port number (1-65535), defaults to 3000 */
  port: number;
  /** Node.js environment (e.g., 'development', 'production', 'test') */
  nodeEnv: string;
}
