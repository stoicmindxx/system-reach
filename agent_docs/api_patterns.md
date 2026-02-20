# API Design Patterns

## URL Structure
- Base: /api/v1/{resource}
- Resource names: plural nouns, kebab-case (/api/v1/order-items)
- Never use verbs in URLs (/api/v1/get-users is wrong, GET /api/v1/users is right)
- Nested resources max one level: /api/v1/users/{id}/orders (never deeper)
- Query params for filtering: /api/v1/orders?status=active&sort=created_at

## HTTP Methods
- GET: read (never mutates state)
- POST: create new resource
- PUT: full replacement of resource
- PATCH: partial update of resource
- DELETE: remove resource

## Response Envelope
Every API response uses the same structure. No exceptions.

Success: { "success": true, "data": { ... }, "error": null }
Error: { "success": false, "data": null, "error": { "code": "VALIDATION_FAILED", "message": "Email address is required", "details": { "field": "email" } } }

Never return raw data without the envelope. Never return errors in a different format.

## Pagination
Every list endpoint supports pagination from day one. No exceptions.

Response: { "success": true, "data": { "items": [ ... ], "cursor": "eyJpZCI6MTAwfQ==", "has_more": true }, "error": null }

- Use cursor-based pagination by default (not offset/limit)
- cursor is opaque to the client
- has_more tells the client whether to request another page
- Default page size: 25. Max page size: 100.

## Status Codes
- 200: success (GET, PUT, PATCH, DELETE)
- 201: created (POST that creates a resource)
- 204: no content (DELETE with no response body)
- 400: validation error (bad input from client)
- 401: authentication required
- 403: forbidden (authenticated but not authorized)
- 404: resource not found
- 409: conflict (duplicate, state conflict)
- 429: rate limited
- 500: internal server error

## Input Validation
- Validate all input at the API layer before passing to services
- Return 400 with specific field-level errors, not generic messages
- Sanitize strings (trim whitespace, normalize unicode)
- Enforce max lengths on all string inputs
- Reject unknown fields in request bodies (strict mode)

## Naming Conventions in JSON
- Request/response body: camelCase for all property names
- Consistent date format: ISO 8601 (2024-01-15T14:30:00Z)
- Consistent ID format: string type, even for numeric IDs
- Null over missing: include nullable fields as null, do not omit them

## Rate Limiting
- All endpoints should be rate limited
- Return 429 with Retry-After header
- Include rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

## Versioning
- Version in URL path: /api/v1/, /api/v2/
- Never make breaking changes within a version
- Breaking change = removing a field, changing a field type, changing response structure
- Non-breaking = adding optional fields, adding new endpoints
