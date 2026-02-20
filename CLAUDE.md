# Universal Project Rules

## Critical Rules (NEVER ignore these)
- BEFORE writing any function, grep the codebase for existing implementations
- BEFORE implementing a pattern, search for how it is already done in this project
- NEVER create files in src/utils/ without first checking for duplicates
- NEVER swallow errors with empty catch blocks
- NEVER make changes beyond the scope of the current task
- NEVER remove existing safety checks, race condition guards, or error tracking
- ALWAYS run tests after making changes
- ALWAYS ask clarifying questions before making architectural changes

## Commands
- Test: `[PROJECT_TEST_COMMAND]`
- Lint: `[PROJECT_LINT_COMMAND]`
- Type check: `[PROJECT_TYPE_CHECK_COMMAND]`
- Dev server: `[PROJECT_DEV_COMMAND]`

## Architecture
src/
  api/        -> Route handlers only. No business logic here.
  services/   -> Business logic. Called by api/ layer.
  models/     -> Data models and schemas.
  utils/      -> Shared utilities. ONE canonical location.
  config/     -> Configuration and environment management.
  types/      -> Shared type definitions.
tests/        -> Mirrors src/ structure exactly.
scripts/      -> Build, deploy, migration scripts.
agent_docs/   -> Detailed conventions for AI agents.

## Code Reuse (most violated rule in AI-assisted codebases)
- If a pattern exists, use it. Do not reinvent it.
- If a library provides the functionality, use the library.
- If logic is used 2+ times, extract it to src/utils/.
- Name utility files by domain (string-utils, date-utils). Never "helpers" or "misc".

## Conventions Summary
- Files: kebab-case (user-profile.ts, user_profile.py)
- Functions: verb-first (get_user, validate_input, create_order)
- Booleans: is/has/should prefix (is_active, has_permission)
- Constants: UPPER_SNAKE_CASE
- Modules: noun describing domain (auth, billing, notifications)

## Detailed Guides (read before relevant tasks)
- @agent_docs/code_conventions.md - Full naming, imports, file structure rules
- @agent_docs/error_handling.md - The ONE error handling pattern for this project
- @agent_docs/api_patterns.md - API design, response envelopes, pagination
- @agent_docs/testing_guide.md - What to test, how to test, where tests go
- @agent_docs/architecture.md - System boundaries, data flow, key decisions

## Gotchas
- [Add project-specific traps here]
- [Things that look like bugs but are intentional]
- [Files that must never be modified directly]

## Workflow
1. Understand the task. Ask questions if anything is unclear.
2. Read relevant agent_docs/ files for the type of work.
3. Search codebase for existing patterns and utilities.
4. Plan the approach. Use Plan Mode for multi-file changes.
5. Implement following existing patterns.
6. Run tests and lint.
7. Review own work for duplication and scope creep.
