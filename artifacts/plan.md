## Overview

This implementation plan outlines the creation of a minimal REST API service built with Express.js and TypeScript. The system exposes a single `GET /hello` endpoint that returns a JSON greeting message `{ "message": "Hello, World!" }`. The implementation follows production-ready patterns including environment-based configuration, CORS support, graceful shutdown handling, and proper error responses for undefined routes and unsupported methods. All code is written in TypeScript with proper typing and follows the specified architecture with modular separation of concerns.

## Tasks

### 1. Initialize Project Structure and Dependencies
**Description:** Set up the Node.js project with TypeScript configuration, Express.js dependencies, and create the foundational folder structure. Create package.json with required scripts for development, building, and testing. Configure TypeScript with strict mode and appropriate compiler options. Create the directory structure: src/, src/routes/, src/config/, src/middleware/, and tests/. Add nodemon for development hot-reload and ts-node for TypeScript execution without pre-compilation.

**Files to create:**
- package.json
- tsconfig.json
- .gitignore
- src/index.ts (empty placeholder)

**Files to modify:**
- None

**Complexity:** Low

**Dependencies:** None

### 2. Implement Configuration Module
**Description:** Create the configuration module that reads and validates environment variables. Implement a `getConfig()` function that returns a typed configuration object with `port` (default: 3000) and `nodeEnv` (default: 'development'). The port must be parsed as an integer and validated to be a valid port number (1-65535). Use a `Config` interface to enforce type safety. This module will be imported by the main entry point to configure the server port.

**Files to create:**
- src/config/index.ts
- src/config/types.ts

**Files to modify:**
- None

**Complexity:** Low

**Dependencies:** 1

### 3. Create Hello Route Handler
**Description:** Implement the core `/hello` route handler. Create a handler function that responds to GET requests with JSON `{ "message": "Hello, World!" }` and HTTP status 200. The handler must set the correct Content-Type header to `application/json`. Create a TypeScript interface `HelloResponse` to type the response structure. The route file should be minimal and focused solely on the response logic, ready to be mounted in the Express app.

**Files to create:**
- src/routes/hello.ts
- src/routes/types.ts

**Files to modify:**
- None

**Complexity:** Low

**Dependencies:** 1

### 4. Implement Error Handling Middleware
**Description:** Create middleware for handling 404 (not found) and 405 (method not allowed) responses. The `notFoundHandler` should return JSON `{ "error": "Not Found" }` with status 404 for any undefined routes. The `methodNotAllowedHandler` should return JSON `{ "error": "Method Not Allowed" }` with status 405 when the wrong HTTP method is used on a valid route. Both handlers must set Content-Type to application/json.

**Files to create:**
- src/middleware/errorHandler.ts

**Files to modify:**
- None

**Complexity:** Low

**Dependencies:** 1

### 5. Implement CORS Middleware
**Description:** Create middleware that enables Cross-Origin Resource Sharing for all requests. The middleware must set the following headers on all responses: `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`, `Access-Control-Allow-Headers: Content-Type, Authorization`. Handle preflight OPTIONS requests by returning 200 with appropriate headers and no body.

**Files to create:**
- src/middleware/cors.ts

**Files to modify:**
- None

**Complexity:** Low

**Dependencies:** 1

### 6. Implement Main Application Entry Point
**Description:** Create the main server entry point at src/index.ts that initializes and configures the Express application. Import and use: CORS middleware, JSON body parser middleware, hello route handler mounted at /hello, and error handlers mounted after all routes. Implement `createApp()` function that returns a configured Express instance. Implement `startServer(port: number)` function that starts the HTTP server with error handling. Implement graceful shutdown by listening to SIGTERM and SIGINT signals, closing the server gracefully with a 10-second timeout. Export the app for testing purposes.

**Files to create:**
- src/index.ts

**Files to modify:**
- src/index.ts (placeholder from task 1)

**Complexity:** Medium

**Dependencies:** 2, 3, 4, 5

### 7. Add Development Scripts and Documentation
**Description:** Update package.json with all required npm scripts: `dev` (nodemon with ts-node), `build` (tsc compilation), `start` (node dist/index.js), `test` (test runner). Add start script that runs the compiled JavaScript. Create a README.md with basic project documentation including setup instructions, available scripts, and API endpoint description.

**Files to create:**
- README.md

**Files to modify:**
- package.json

**Complexity:** Low

**Dependencies:** 6

### 8. Create Unit Tests for Route Handler
**Description:** Create unit tests for the hello route handler using a test framework (Jest or Mocha). Tests must verify: GET /hello returns status 200, response body contains `{ "message": "Hello, World!" }`, Content-Type header is application/json. Tests should be isolated and not require the full server to start.

**Files to create:**
- tests/routes/hello.test.ts
- tests/setup.ts

**Files to modify:**
- package.json (add test script and test dependencies)

**Complexity:** Medium

**Dependencies:** 3, 7

## File Structure

```
test-ci-4/
├── artifacts/
│   └── plan.md
├── src/
│   ├── config/
│   │   ├── index.ts
│   │   └── types.ts
│   ├── middleware/
│   │   ├── cors.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── hello.ts
│   │   └── types.ts
│   └── index.ts
├── tests/
│   ├── routes/
│   │   └── hello.test.ts
│   └── setup.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Testing Strategy

### Unit Tests
1. **Hello Route Handler Tests** (tests/routes/hello.test.ts)
   - Test GET /hello returns 200 status
   - Test response body equals `{ "message": "Hello, World!" }`
   - Test Content-Type header is `application/json`
   - Test handler is a function

2. **Configuration Module Tests**
   - Test default port is 3000 when PORT env var not set
   - Test PORT env var is parsed correctly
   - Test invalid port throws error or uses default

### Integration Tests
1. **Server Startup Tests**
   - Test server starts on configured port
   - Test server responds to requests
   - Test graceful shutdown works within timeout

2. **Endpoint Tests**
   - Test GET /hello returns correct response
   - Test POST /hello returns 405 Method Not Allowed
   - Test GET /undefined returns 404 Not Found
   - Test CORS headers present on all responses

### Manual Testing
1. Start server with `npm run dev`
2. Run `curl http://localhost:3000/hello` and verify JSON response
3. Run `curl -X POST http://localhost:3000/hello` and verify 405 response
4. Run `curl http://localhost:3000/unknown` and verify 404 response
5. Check CORS headers with `curl -I http://localhost:3000/hello`

## Risks

1. **TypeScript Configuration Issues**: Incorrect tsconfig.json settings may cause compilation errors or runtime issues. Mitigation: Use strict mode with esModuleInterop and moduleResolution set to node.

2. **Port Binding Conflicts**: Port 3000 may already be in use on development machines. Mitigation: Use PORT environment variable to configure different ports; add error handling for EADDRINUSE.

3. **Graceful Shutdown Timing**: If the server doesn't close connections properly, shutdown may hang. Mitigation: Implement timeout for graceful shutdown and force close if exceeded.

4. **CORS Preflight Handling**: Missing OPTIONS handler may cause browser CORS errors. Mitigation: Ensure cors middleware handles OPTIONS requests and returns 200 immediately.

5. **Dependency Version Conflicts**: Express or TypeScript version mismatches may cause issues. Mitigation: Pin dependency versions in package.json and use compatible TypeScript version (5.x).
