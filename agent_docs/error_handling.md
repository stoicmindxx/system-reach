# Error Handling

This project uses ONE consistent error handling pattern. Do not invent alternatives.

## Core Principle
Errors are handled at boundaries, not deep in business logic. Services throw structured errors. API handlers catch them and format responses.

## Custom Error Classes
Every project must define a base error class. All custom errors extend it.

AppError (base)
  ValidationError (400) - bad input from client
  AuthenticationError (401) - identity not verified
  AuthorizationError (403) - identity verified, access denied
  NotFoundError (404) - resource does not exist
  ConflictError (409) - state conflict (duplicate, race condition)
  InternalError (500) - unexpected failures

## Error Structure
Every error must include:
- message: human-readable, safe to show to end users
- code: machine-readable string (VALIDATION_FAILED, USER_NOT_FOUND, RATE_LIMIT_EXCEEDED)
- status: HTTP status code
- context: object with debugging details (NEVER expose to end users)

## Rules

### NEVER do these:
- Empty catch blocks that swallow errors silently
- Catch-and-rethrow without adding context
- Generic Something went wrong messages when you have specific information
- Log errors deep inside services (log at the boundary)
- Use string matching on error messages to determine error type
- Return null/undefined to signal an error condition

### ALWAYS do these:
- Throw specific error types from services (ValidationError, NotFoundError, etc.)
- Catch at the API boundary and format into the standard response envelope
- Include operation context when logging (what was being attempted, with what input)
- Use error codes for programmatic handling, messages for humans
- Let unexpected errors bubble up. Do not catch what you cannot handle.
- Validate inputs at the entry point, before business logic runs

## Logging Pattern
Log at boundary only. Include error message, code, operation, sanitized input, and stack trace.
Never log sensitive data (passwords, tokens, PII). Sanitize before logging.

## Expected vs Unexpected Failures
- Expected failures (user not found, invalid input, rate limited): use specific error types, do NOT log as errors (log as warnings or info)
- Unexpected failures (database down, null reference, timeout): log as errors, return InternalError to client

## Third-Party Service Errors
Wrap external service errors in your own error types. Never let a raw AWS/Stripe/database error propagate to the API response. Translate them at the integration boundary.
