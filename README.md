# test-ci-4

A lightweight REST API service built with Express.js and TypeScript. This project exposes a single `GET /hello` endpoint that returns a JSON greeting message, serving as a foundational API template demonstrating proper project structure, configuration management, and production-ready patterns.

## Features

- Minimalist single-endpoint API
- TypeScript-first development with compiled JavaScript runtime
- Express.js web framework for HTTP handling
- Configurable server port via environment variables
- CORS-enabled for cross-origin accessibility
- Production-ready with graceful shutdown handling

## Technology Stack

- **Node.js** 18 LTS+ - Runtime environment
- **TypeScript** 5.x - Type-safe development
- **Express.js** 4.x - Web framework
- **ts-node** 10.x - TypeScript execution without compilation
- **nodemon** 3.x - Auto-restart on file changes
- **Jest** - Testing framework

## Prerequisites

- Node.js version 18.0.0 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-ci-4
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload using nodemon and ts-node |
| `npm run build` | Compile TypeScript to JavaScript using tsc |
| `npm start` | Start the production server (runs compiled JavaScript from `dist/index.js`) |
| `npm test` | Run tests using Jest |
| `npm run lint` | Lint TypeScript files using ESLint |
| `npm run format` | Format code using Prettier |

## Configuration

The application can be configured using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `NODE_ENV` | Environment (development, production, test) | `development` |

### Example

```bash
# Set custom port
PORT=8080 npm start

# Or using .env file
PORT=3001
NODE_ENV=production
```

## API Endpoints

### GET /hello

Returns a JSON greeting message.

**Request:**
```http
GET /hello
```

**Response:**
```json
{
  "message": "Hello, World!"
}
```

**Status Codes:**
- `200 OK` - Successful request
- `404 Not Found` - If the route is not found
- `405 Method Not Allowed` - If HTTP method is not GET

**CORS:**
The endpoint is accessible from any origin.

## Project Structure

```
test-ci-4/
├── src/
│   ├── index.ts              # Application entry point
│   ├── config/
│   │   ├── index.ts          # Configuration module
│   │   └── types.ts          # Configuration types
│   ├── routes/
│   │   ├── hello.ts          # Hello endpoint handler
│   │   └── types.ts          # Route types
│   └── middleware/
│       ├── cors.ts           # CORS middleware
│       └── errorHandler.ts   # Error handling middleware
├── dist/                     # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. The server will automatically restart when you modify TypeScript files.

3. Access the API at `http://localhost:3000/hello`

## Building for Production

1. Compile TypeScript:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Testing

Run the test suite:
```bash
npm test
```

## License

MIT
