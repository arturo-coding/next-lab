# Implementation Plan: Next.js Learning Lab

**Branch**: `006-nextjs-learning-lab` | **Date**: 2026-04-01 | **Spec**: [specs/006-nextjs-learning-lab/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-nextjs-learning-lab/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a modern, educational web application to master Next.js 15 through a structured, side-by-side "Code & Render" experience. The app will organize content strictly following official documentation sections, utilizing React Server Components (RSC) for content delivery and interactive client components for exercises and live previews.

## Technical Context

**Language/Version**: TypeScript (Strict mode), Node.js 20+
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS, Zod (Validation), Lucide React (Icons)
**Storage**: Client-side `localStorage` for progress persistence (as per FR-006)
**Testing**: Playwright (E2E flows), Vitest (Logic/Schema validation)
**Target Platform**: Vercel (Optimized for PPR and Edge functions)
**Project Type**: Web application (Educational Portal)
**Performance Goals**: <500ms initial load, <1s view toggling (SC-002)
**Constraints**: 50/50 split view for Code and Render; strict alignment with official Next.js 15 docs
**Scale/Scope**: ~10-15 core documentation sections covering RSC, Server Actions, PPR, and Middleware

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Server-First Architecture (RSC) usage: Content sections and lesson metadata fetched via Server Components.
- [x] II. Next.js 15 Official Standards compliance: App Router, `<Form>`, and Partial Prerendering will be featured.
- [x] III. Utility-First Styling (Tailwind) alignment: All UI and rendered components use Tailwind.
- [x] IV. Type-Safe Correctness (TypeScript + Zod): Zod schemas for Lesson and Progress data.
- [x] V. Educational Clarity & Foundation Simplicity: Flat component structure, focus on clear examples.

## Project Structure

### Documentation (this feature)

```text
specs/006-nextjs-learning-lab/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/                 # Next.js App Router (Routing & Pages)
│   ├── (lessons)/       # Grouped lesson routes
│   └── api/             # Progress persistence (if moving beyond localStorage)
├── components/          # Shared UI (Sidebar, SplitView, SyntaxHighlighter)
│   ├── lessons/         # Lesson-specific preview components
│   └── ui/              # Base Tailwind components
├── lib/                 # Zod schemas, metadata parsing logic
└── content/             # Markdown or JSON source for lessons
```

**Structure Decision**: Single project (Option 1) as it is a self-contained learning lab.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
