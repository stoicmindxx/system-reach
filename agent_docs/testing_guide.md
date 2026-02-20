# Testing Guide

## Test Structure
Tests mirror the src/ directory exactly.

src/services/order-service.ts   -> tests/unit/services/order-service.test.ts
src/api/user-routes.ts          -> tests/integration/api/user-routes.test.ts
src/utils/string-utils.ts       -> tests/unit/utils/string-utils.test.ts

If you cannot figure out where a test belongs, the source code is probably in the wrong place too.

## What to Test

### Always test:
- Business logic in services/ (unit tests)
- Input validation (unit tests)
- Error paths and edge cases (unit tests)
- API endpoint contracts: correct status codes, response shapes, auth checks (integration tests)
- Data model constraints and transformations (unit tests)

### Never test:
- Framework internals (Express routing, ORM query building)
- Third-party library behavior
- Simple getters/setters with no logic
- Implementation details that could change without affecting behavior

## Test Naming
Test names describe behavior, not implementation.

GOOD:
- returns 404 when user does not exist
- rejects orders with negative quantities
- retries failed payments up to 3 times

BAD:
- test getUserById
- test error handling
- test validation

## Test Structure (Arrange, Act, Assert)
Every test follows this pattern:
1. Arrange: set up test data and dependencies
2. Act: call the function or endpoint being tested
3. Assert: verify the result matches expectations

One behavior per test. If a test has multiple unrelated assertions, split it.

## Mocking Rules
- Mock external services (databases, APIs, file systems) at the boundary
- Never mock the thing you are testing
- Prefer dependency injection over monkey-patching
- Reset mocks between tests. Shared state between tests causes flaky failures.
- If a test needs more than 3 mocks, the code under test probably has too many dependencies

## Test Data
- Use factory functions to create test data, not raw object literals
- Never use production data in tests
- Each test creates its own data. Never depend on data from another test.
- Use realistic but obviously fake values (test@example.com, not asdf@asdf.com)

## When to Write Tests
- New feature: write tests alongside the implementation
- Bug fix: write a failing test that reproduces the bug BEFORE fixing it
- Refactor: verify existing tests pass before and after. Add tests for gaps found.

## Coverage
- Coverage is a signal, not a target. 80% is healthy. 100% is suspicious.
- Focus on covering critical paths and edge cases, not chasing numbers.
- Untested code is a risk. Tested trivial code is waste.
