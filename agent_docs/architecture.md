# Architecture

## Layered Architecture
This project enforces a strict layered architecture. Each layer has one job and clear boundaries.

[Client] -> [API Layer] -> [Service Layer] -> [Data Layer] -> [External Services]

### API Layer (src/api/)
- Receives HTTP requests
- Validates input
- Calls service layer
- Formats responses using the standard envelope
- Handles authentication/authorization checks
- NEVER contains business logic
- NEVER talks to the database directly

### Service Layer (src/services/)
- Contains ALL business logic
- Orchestrates operations across multiple models
- Throws typed errors (ValidationError, NotFoundError, etc.)
- NEVER knows about HTTP (no request/response objects, no status codes)
- NEVER formats API responses
- Can call other services, but avoid circular dependencies

### Data Layer (src/models/)
- Defines data schemas and relationships
- Handles database queries and mutations
- NEVER contains business logic (no if/else decisions about domain rules)
- NEVER called directly from API layer

### Utilities (src/utils/)
- Pure functions with no side effects
- Shared across all layers
- No dependency on any specific layer
- Stateless. If it needs state, it belongs in a service.

## Dependency Direction
Dependencies flow downward only.

api/ -> services/ -> models/
All layers can import from utils/
utils/ imports from NOTHING internal (only external packages)

Never create upward or circular dependencies.

## Configuration (src/config/)
- All environment variables read in ONE place (config/)
- Services receive config as parameters, never read env vars directly
- Validate all required config at startup, fail fast if missing
- Separate config by environment (development, staging, production)
- Secrets never committed to version control

## Data Flow for a Typical Request
1. Request hits API route handler
2. Handler validates input (schema validation)
3. Handler checks auth (middleware or inline)
4. Handler calls service method with validated data
5. Service executes business logic
6. Service calls model methods for data access
7. Model queries database, returns raw data
8. Service transforms data, applies business rules
9. Service returns result (or throws typed error)
10. Handler formats result into response envelope
11. Handler sends response with correct status code

## Key Architectural Decisions
Document every significant decision here. Use the format:

### Decision: [Title]
- Context: [Why this decision was needed]
- Decision: [What was decided]
- Consequences: [What this means for the codebase]
- Date: [When decided]

## Boundaries to Respect
- Never bypass a layer. API must go through service to reach models.
- Never let database-specific types leak into the API layer.
- Never let HTTP concepts leak into the service layer.
- External service integrations get their own wrapper in services/ or a dedicated integrations/ directory.
- If a new feature does not fit cleanly into this structure, discuss before implementing.
