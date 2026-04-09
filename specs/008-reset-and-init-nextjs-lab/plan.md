# Implementation Plan: Reset and Initialize Next.js Lab

**Branch**: `008-reset-and-init-nextjs-lab` | **Date**: 2026-04-08 | **Spec**: [/specs/008-reset-and-init-nextjs-lab/spec.md](/specs/008-reset-and-init-nextjs-lab/spec.md)
**Input**: Feature specification from `/specs/008-reset-and-init-nextjs-lab/spec.md`

## Summary
Complete project reset and re-initialization using Next.js 16.2+ to enable AI-native development workflows via `AGENTS.md` and bundled documentation in `node_modules`.

## Technical Context

**Language/Version**: TypeScript (Strict mode), Node.js 20+  
**Primary Dependencies**: Next.js 16.2.2 (App Router), React 19.2, Tailwind CSS 4.0, Zod, Shiki  
**Storage**: Local file system (Next.js bundled docs)  
**Testing**: Playwright (E2E), Jest/Vitest (Unit)  
**Target Platform**: Vercel (Production), Local (Development)  
**Project Type**: Web application (Educational Lab)  
**Performance Goals**: < 2s initial LCP; < 100ms interaction latency for doc navigation  
**Constraints**: MUST use bundled docs from `node_modules/next/dist/docs/`; MUST include `AGENTS.md`; MUST NOT delete the `.github/` directory during reset.  
**Scale/Scope**: MVP rendering 1st lesson; full docs tree explorer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Server-First Architecture (RSC) usage: Docs will be fetched and rendered via RSC.
- [x] II. Next.js 15 Official Standards compliance: Using Next.js 16+ (superset of 15 standards).
- [x] III. Utility-First Styling (Tailwind) alignment: Tailwind CSS 4.0 for all UI.
- [x] IV. Type-Safe Correctness (TypeScript + Zod): Zod schemas for documentation frontmatter.
- [x] V. Educational Clarity & Foundation Simplicity: Flat structure for doc loading logic.

## Project Structure

### Documentation (this feature)

```text
specs/008-reset-and-init-nextjs-lab/
├── plan.md              # This file
├── research.md          # Next.js 16.2+ findings
├── data-model.md        # Documentation Lesson entity
├── quickstart.md        # Verification guide
├── contracts/           # UI Contract
└── tasks.md             # (To be created in next phase)
```

### Source Code (repository root)

```text
src/
├── app/                 # App Router
│   ├── layout.tsx       # Root layout with sidebar
│   ├── page.tsx         # Dashboard / Lesson view
│   └── lessons/         # Dynamic routes for docs
├── components/          # Shared UI components
├── lib/                 # Documentation loader logic
└── models/              # Zod schemas for docs
```

**Structure Decision**: Single project Next.js structure (Option 1).

## Complexity Tracking

*No violations to justify.*
