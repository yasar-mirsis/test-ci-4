# AGENTS.md — test-ci-4

This file describes the project for AI agents working on implementation issues.

## Project Context

# Analysis Document: test-ci-4

## Stakeholders

| Stakeholder | Role | Responsibilities |
|-------------|------|------------------|
| Development Team | Implementation | Build the REST API endpoint |
| QA/Testing Team | Validation | Verify endpoint functionality |
| DevOps Team | Deployment | Configure CI/CD pipeline |
| Product Owner | Requirements | Define and prioritize features |

## User Stories

### US-1: Implement Hello World Endpoint
**As a** developer  
**I want** a GET /hello endpoint that returns a greeting message  
**So that** I can verify the API is working correctly

**Acceptance Criteria:**
- [ ] Endpoint responds to GET requests at path `/hello`
- [ ] Response body contains JSON with `message` field
- [ ] The `message` field value is exactly "Hello, World!"
- [ ] Response has HTTP status code 200
- [ ] Response Content-Type header is `application/json`
- [ ] Endpoint is accessible from any origin (CORS enabled)

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | System shall expose a single HTTP GET endpoint at `/hello` | Must |
| FR-2 | The endpoint shall return a JSON response with structure `{ "message": "Hello, World!" }` | Must |
| FR-3 | The server shall listen on a configurable port (default: 3000) | Must |
| FR-4 | The application shall use Express.js as the web framework | Must |
| FR-5 | The codebase shall be written in TypeScript | Must |
| FR-6 | The server entry point shall be a single file | Must |
| FR-7 | The application shall handle JSON responses with proper Content-Type headers | Must |

## Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-1 | Response time shall be under 100ms for the /hello endpoint | Must |
| NFR-2 | The application shall start within 5 seconds | Should |
| NFR-3 | Code shall follow TypeScript best practices and be properly typed | Should |
| NFR-4 | The application shall handle graceful shutdown on SIGTERM/SIGINT | Could |
| NFR-5 | The code shall be linted and formatted consistently | Should |
| NFR-6 | A package.json with all dependencies shall be provided | Must |
| NFR-7 | The application shall be production-ready with minimal configuration | Should |

## Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| EC-1 | Request to undefined route | Return 404 status code |
| EC-2 | HTTP method other than GET on /hello | Return 405 Method Not Allowed |
| EC-3 | Request with missing Accept header | Still return JSON response |
| EC-4 | Server already bound to port | Log error and exit with non-zero code |
| EC-5 | Invalid port number in environment variable | Fall back to default port 3000 |
| EC-6 | Request with query parameters (e.g., /hello?foo=bar) | Ignore query params, return same response |
| EC-7 | Request with trailing slash (/hello/) | Return 404 (strict path matching) |
| EC-8 | Very large number of concurrent requests | Server should handle gracefu

[... truncated for brevity ...]

## Architecture

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
**Descript

[... truncated for brevity ...]

## Working Guidelines

- Read this file and README.md before starting any work
- Follow existing code patterns and conventions
- Write clean, production-quality code with proper error handling
- Create or update tests if a testing setup exists
- Do NOT run git commands — the pipeline handles commits and pushes
- Do NOT ask questions — you are running in an automated pipeline