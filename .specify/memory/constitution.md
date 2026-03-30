<!-- 
Sync Impact Report:
- Version change: [CONSTITUTION_VERSION] -> 1.0.0
- Added Sections: Core Principles (Next.js 15, Tailwind, Type Safety), Technology Stack, Development Workflow
- Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
-->

# next-lab Constitution

## Core Principles

### I. Server-First Architecture (RSC)
Favor React Server Components (RSC) by default for all data-fetching and logic. Only use 'use client' for interactive elements or client-only side effects. Fetch data directly in Server Components to minimize client-side JavaScript and improve performance. Rationale: Superior TTFB and reduced client-side overhead.

### II. Official Next.js 15 Standards
Adhere strictly to the official Next.js 15 documentation. Use the App Router exclusively. Always prefer built-in components and features: `<Image>`, `<Link>`, `<Script>`, and the new React 19 `<Form>` component. Utilize Partial Prerendering (PPR) and Streaming. Rationale: Future-proof architecture and built-in performance optimizations.

### III. Utility-First Styling (Tailwind CSS)
Use Tailwind CSS for all styling and layout. Avoid custom CSS files unless absolutely necessary for complex animations or third-party integrations. Maintain a clean, consistent design system by using predefined tokens. Rationale: Design consistency and minimal CSS bundle size.

### IV. Mandatory Type-Safe Correctness
Every file MUST be written in TypeScript with no 'any' types. Use Zod for all runtime schema validation, including API responses, database queries, and Server Action inputs. All core logic must be unit-testable. Rationale: Prevents runtime errors and improves developer experience through self-documenting code.

### V. Simplified Foundations & Educational Clarity
Keep the code structure flat and intuitive. Components should be small, focused, and reusable. Prefer Server Actions and the 'useActionState' hook for mutations. Document complex logic with clear explanations. Rationale: Ease of learning, maintenance, and debugging.

## Technology Stack

The stack is non-negotiable for this project to ensure consistency and performance:
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Mutations**: Server Actions + useActionState
- **Infrastructure**: Vercel (preferred for PPR and Edge functions)

## Development Workflow

### I. Spec-Driven Implementation
No feature development starts without a corresponding `spec.md` and `plan.md`. The spec defines WHAT, the plan defines HOW.

### II. Task-First Execution
All implementation work must be tracked in `tasks.md`. Tasks should be granular enough to be completed in one session and must include clear acceptance criteria.

### III. Automated Quality Gates
Every PR or major change must pass:
1. TypeScript Linting/Checking
2. Unit tests for logic
3. E2E tests for critical user flows

## Governance

This constitution is the supreme authority for development practices in `next-lab`. Any deviation must be explicitly justified. Amendments require a version bump and updates to all dependent templates.

**Version**: 1.0.0 | **Ratified**: 2026-03-30 | **Last Amended**: 2026-03-30
