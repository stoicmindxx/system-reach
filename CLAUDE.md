# System Reach Website

## About
System Reach helps HVAC business owners stop undercharging and overworking by providing pricing strategies and business systems for the technical trades.

## Critical Rules (NEVER ignore these)
- BEFORE writing any component, grep the codebase for existing implementations
- BEFORE implementing a pattern, search for how it is already done in this project
- NEVER swallow errors with empty catch blocks
- NEVER make changes beyond the scope of the current task
- NEVER use placeholder text in production pages (no lorem ipsum)
- NEVER hardcode prices or offers. Use config/constants for anything that changes.
- ALWAYS run lint and build after making changes
- ALWAYS ask clarifying questions before making architectural changes

## Commands
- Dev server: [PROJECT_DEV_COMMAND]
- Build: [PROJECT_BUILD_COMMAND]
- Lint: [PROJECT_LINT_COMMAND]

## Architecture
src/
  pages/       -> Route-level page components. One file per page.
  components/  -> Reusable UI components. Shared across pages.
  layouts/     -> Page layout wrappers (header, footer, nav).
  styles/      -> Global styles and design tokens.
  assets/      -> Images, fonts, icons.
  utils/       -> Helper functions (formatting, validation).
  config/      -> Site configuration, pricing data, copy constants.
public/        -> Static files served directly.

## Code Reuse
- If a component exists, use it. Do not create a second version.
- Shared UI patterns (buttons, cards, sections) go in components/.
- Site copy and pricing data go in config/. Never inline in components.
- If a utility is used 2+ times, extract it to utils/.

## Conventions
- Files: kebab-case (pricing-card.jsx, hero-section.jsx)
- Components: PascalCase (PricingCard, HeroSection)
- Functions: camelCase (formatPrice, validateEmail)
- CSS classes: kebab-case or Tailwind utilities
- Constants: UPPER_SNAKE_CASE (SITE_TITLE, CTA_TEXT)

## Design Rules
- Mobile-first. Every component must work on mobile before desktop.
- Consistent spacing using design tokens, not arbitrary pixel values.
- All images must have alt text.
- CTAs must be clear and action-oriented (no generic "Click here").
- Target audience is HVAC business owners. Speak their language.

## Detailed Guides (read before relevant tasks)
- @agent_docs/code_conventions.md - Full naming, imports, file structure rules
- @agent_docs/error_handling.md - Error handling patterns
- @agent_docs/testing_guide.md - What to test, how to test

## Gotchas
- [Add project-specific traps as they come up]

## Workflow
1. Understand the task. Ask questions if anything is unclear.
2. Read relevant agent_docs/ files for the type of work.
3. Search codebase for existing components and patterns.
4. Plan the approach.
5. Implement following existing patterns.
6. Run lint and build.
7. Review own work for duplication and scope creep.
