# Architecture Document: test-ci-4

## System Overview

The **test-ci-4** system is a lightweight REST API service built with Express.js and TypeScript. Its primary purpose is to expose a single `GET /hello` endpoint that returns a JSON greeting message. This serves as a foundational API template that demonstrates proper project structure, configuration management, and production-ready patterns.

**Key Characteristics:**
- Minimalist single-endpoint API
- TypeScript-first development with compiled JavaScript runtime
- Express.js web framework for HTTP handling
- Configurable server port via environment variables
- CORS-enabled for cross-origin accessibility
- Production-ready with graceful shutdown handling

**Architecture Style:** Monolithic single-tier server application

---

## Components

### 1. Application Entry Point (`src/index.ts`)
**Responsibility:**  
- Initialize and configure the Express server
- Load environment variables and configuration
- Register middleware (CORS, JSON parsing)
- Define and mount route handlers
- Handle server lifecycle (startup, graceful shutdown)
- Bind server to configured port with error handling

**Interfaces:**
- `createApp()`: Creates and configures Express application instance
- `startServer(port: number)`: Starts HTTP server on specified port
- `handleGracefulShutdown()`: Handles SIGTERM/SIGINT signals

### 2. Route Handler (`src/routes/hello.ts`)
**Responsibility:**
- Define the `/hello` endpoint handler
- Return properly formatted JSON response
- Handle HTTP method validation (GET only)

**Interfaces:**
- `helloHandler(req, res)`: Express request handler function

### 3. Configuration Module (`src/config/index.ts`)
**Responsibility:**
- Parse and validate environment variables
- Provide typed configuration access
- Apply sensible defaults for missing values

**Interfaces:**
- `getConfig()`: Returns validated configuration object
- Configuration interface exposes: `port`, `nodeEnv`

### 4. Error Handler (`src/middleware/errorHandler.ts`)
**Responsibility:**
- Handle undefined routes (404)
- Handle method not allowed responses (405)
- Centralize error response formatting

**Interfaces:**
- `notFoundHandler(req, res)`: Returns 404 for undefined routes
- `methodNotAllowedHandler(req, res)`: Returns 405 for wrong methods

### 5. Middleware Stack
**Responsibility:**
- CORS middleware: Enable cross-origin requests from any origin
- JSON parser middleware: Parse incoming JSON bodies
- Logging middleware: Console logging for requests (optional)

---

## Data Model

This is a stateless API with no persistent data storage. The data model consists solely of request/response DTOs.

### Response DTOs

#### HelloResponse
```typescript
interface HelloResponse {
  message: string;  // Always "Hello, World!"
}
```

### Relationships
- **None** - The system is stateless with no database or external service dependencies.

---

## API Contracts

### Endpoint: GET /hello

**Method:** `GET`  
**Path:** `/hello`  
**Description:** Returns a greeting message to verify API functionality.

**Request:**
- No path parameters
- No query parameters (ignored if present)
- No request body required
- Headers:
  - `Accept`: Optional (defaults to JSON)
  - `Content-Type`: Not applicable (no body)

**Response (Success):**
- Status Code: `200 OK`
- Content-Type: `application/json`
- Body:
```json
{
  "message": "Hello, World!"
}
```

**Response (Error Cases):**

| Status | Condition | Response Body |
|--------|-----------|---------------|
| 405 | HTTP method other than GET | `{ "error": "Method Not Allowed" }` |
| 404 | Request to undefined route | `{ "error": "Not Found" }` |

**CORS Headers (on all responses):**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Technology Stack

| Technology | Version | Justification |
|------------|---------|---------------|
| **Node.js** | 18 LTS+ | Required runtime; LTS ensures stability and long-term support |
| **TypeScript** | 5.x | Primary language; provides type safety, better IDE support, and catches errors at compile time |
| **Express.js** | 4.x | Industry-standard Node.js web framework; lightweight, flexible, and well-documented |
| **ts-node** | 10.x | Enables TypeScript execution without manual compilation; simplifies development workflow |
| **@types/express** | 4.x | TypeScript type definitions for Express; ensures type-safe Express usage |
| **nodemon** | 3.x | Development tool; auto-restarts server on file changes for faster iteration |
| **eslint** | 8.x+ | Code linting; enforces consistent code style and catches potential issues |
| **prettier** | 3.x+ | Code formatting; ensures consistent formatting across the codebase |

**Why Express.js?**
- Minimal learning curve with extensive ecosystem
- Perfect fit for simple REST APIs
- Middleware architecture aligns with requirements
- Production-ready and battle-tested

**Why TypeScript?**
- Requirement FR-5 mandates TypeScript
- Type safety reduces runtime errors
- Better developer experience with autocomplete and refactoring
- Easier maintenance and onboarding

**Why no database?**
- Requirement analysis shows static response only
- No persistence needed for `/hello` endpoint
- Reduces complexity and deployment overhead

---

## Data Flow

### Request Lifecycle (GET /hello)

1. **Client Request**
   - Client sends HTTP GET request to `http://localhost:3000/hello`

2. **Server Reception**
   - Node.js HTTP server receives the request
   - Express middleware stack begins processing

3. **CORS Middleware**
   - CORS headers added to response
   - OPTIONS preflight requests handled if applicable

4. **Route Matching**
   - Express router matches `/hello` path
   - Validates HTTP method is GET
   - If method is not GET → return 405 Method Not Allowed
   - If path doesn't match → return 404 Not Found

5. **Handler Execution**
   - `helloHandler` function executes
   - Constructs response object: `{ message: "Hello, World!" }`

6. **Response Serialization**
   - Express serializes object to JSON string
   - Sets `Content-Type: application/json` header
   - Writes response body to client

7. **Client Receives Response**
   - Client receives 200 OK with JSON body
   - Processing complete

### Server Startup Flow

1. Load environment variables via `dotenv` or `process.env`
2. Parse and validate configuration (port, environment)
3. Create Express application instance
4. Register middleware (CORS, JSON parser)
5. Register routes
6. Register error handlers
7. Bind HTTP server to configured port
8. Register signal handlers for graceful shutdown
9. Log startup message with port number

### Graceful Shutdown Flow

1. Receive SIGTERM or SIGINT signal
2. Stop accepting new connections
3. Wait for existing requests to complete (timeout: 5s)
4. Close server gracefully
5. Exit process with code 0 (success) or 1 (failure)

---

## Security Considerations

### Implemented Security Measures

| Measure | Implementation | Status |
|---------|----------------|--------|
| **Input Validation** | No input accepted; static response | N/A |
| **CORS Configuration** | Allows all origins (per requirement) | Implemented |
| **JSON Parsing** | Built-in Express JSON parser | Implemented |
| **Error Handling** | Centralized error handler prevents info leakage | Implemented |
| **HTTP Method Validation** | Only GET allowed on /hello | Implemented |

### Security Notes

1. **CORS Policy**: Currently allows all origins (`*`). For production with sensitive data, restrict to specific domains.

2. **No Authentication Required**: Per requirements, `/hello` is public. No auth middleware needed.

3. **No Sensitive Data**: Response contains no PII or sensitive information.

4. **Dependency Security**: Regularly update dependencies to patch known vulnerabilities.

5. **Environment Variables**: Port configuration via environment variable prevents hardcoded values.

6. **Rate Limiting**: Not implemented (not required for this scope). Consider adding for production.

---

## Scalability Notes

### Current Architecture Limitations

| Aspect | Limitation | Mitigation |
|--------|------------|------------|
| **Single Instance** | No load balancing | Use reverse proxy (nginx) or cloud load balancer |
| **In-Memory Only** | No session persistence | Stateless by design; scales horizontally |
| **No Caching** | Response generated each request | Add Redis/memcached for high-traffic endpoints |
| **Synchronous** | Blocking I/O | Not applicable; endpoint is CPU-bound static response |

### Scaling Recommendations

1. **Horizontal Scaling**: Deploy multiple instances behind a load balancer
2. **Containerization**: Use Docker for consistent deployment across environments
3. **Orchestration**: Kubernetes or Docker Swarm for automated scaling
4. **CDN**: Cache response at edge for global low-latency access
5. **Monitoring**: Add health check endpoint (`/health`) for load balancer probes

### Performance Characteristics

| Metric | Expected Value |
|--------|----------------|
| Response Time | < 10ms (well under 100ms requirement) |
| Throughput | 10,000+ req/sec (single instance) |
| Cold Start | < 2 seconds (with ts-node: ~5s) |
| Memory Usage | ~50MB baseline |

### Future Enhancements (Out of Scope)

- Add health check endpoint for container orchestration
- Implement structured logging with Winston/Pino
- Add Prometheus metrics endpoint
- Integrate API documentation (Swagger/OpenAPI)
- Add request/response validation middleware

---

## File Structure

```
test-ci-4/
├── src/
│   ├── index.ts              # Application entry point
│   ├── config/
│   │   └── index.ts          # Configuration management
│   ├── routes/
│   │   └── hello.ts          # Hello endpoint handler
│   └── middleware/
│       └── errorHandler.ts   # Error handling middleware
├── package.json
├── tsconfig.json
├── .env.example
└── artifacts/
    └── architecture.md       # This document
```

---

## Assumptions

1. **Port Configuration**: Default port 3000, overridable via `PORT` environment variable
2. **Node.js Version**: Node.js 18 LTS or higher available in runtime
3. **Single Origin CORS**: Any origin allowed (per requirements)
4. **No Database**: Static response; no external dependencies
5. **Single Instance**: No load balancing or clustering required
6. **npm Package Manager**: npm used for dependency management
7. **Console Logging**: Basic console logging sufficient; no external logging service
8. **Development Tooling**: ts-node used for development; compiled JS for production
