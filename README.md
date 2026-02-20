# Universal CLAUDE.md Template

A drop-in governance system for AI-assisted development using Claude Code.

## Quick Start
1. Copy CLAUDE.md and agent_docs/ into your project root
2. Replace [PROJECT_TEST_COMMAND] and other placeholders with your actual commands
3. Fill in the Gotchas section with project-specific traps
4. Start coding with Claude Code

## Structure
- CLAUDE.md - Root rules file (loaded automatically by Claude Code)
- agent_docs/code_conventions.md - Naming, imports, file structure
- agent_docs/error_handling.md - The ONE error handling pattern
- agent_docs/api_patterns.md - API design, response envelopes, pagination
- agent_docs/testing_guide.md - What to test, how to test, where tests go
- agent_docs/architecture.md - System boundaries, data flow, decisions

## Why This Exists
AI agents amplify whatever direction you set from the start. This template enforces clean patterns so the AI builds on solid foundations instead of compounding bad habits.

Based on research from GitClear, HumanLayer, Anthropic docs, and 73+ production CLAUDE.md examples.
