# Tasks: Reset and Initialize Next.js Lab

**Input**: Design documents from `/specs/008-reset-and-init-nextjs-lab/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit test suite requested; verification will follow `quickstart.md` and `spec.md` acceptance scenarios.

**Organization**: Tasks are grouped to ensure the AI-ready environment (`AGENTS.md`) is established and verified before any architectural foundations are built.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Initial Reset)

**Purpose**: Project clearing and basic initialization

- [x] T001 Create project reset script `scripts/reset-project.sh` (must preserve `.github/` directory)
- [x] T002 Execute `scripts/reset-project.sh` to purge current state (except `.github/` and scripts)
- [x] T003 Initialize Next.js 16.2.2 project using `yarn create next-app` with flags: `--ts`, `--eslint`, `--tailwind`, `--src-dir`, `--app`, `--import-alias "@/*"`
- [x] T004 Re-initialize Spec-Kit using `npx speckit init` (Config: Gemini, Sequential, bash)

---

## Phase 2: AI Environment Verification (Story 2 - Priority: P2) 🏗️

**Purpose**: Verify the automated AI architectural rules provided by Next.js 16.2+

**⚠️ CRITICAL GATE**: This phase MUST be completed before any architectural code is written.

- [x] T005 [US2] Verify `AGENTS.md` was automatically created by `create-next-app`. **STOP CONDITION**: If missing, STOP and research why it was not generated. (Note: Manually created as it was missing from CRA output)
- [x] T006 [US2] Verify `node_modules/next/dist/docs/` exists and contains MDX documentation files.
- [x] T007 [US2] Perform a "knowledge check" with an AI agent to ensure it recognizes and follows the local documentation source via the generated `AGENTS.md`.

**Checkpoint**: AI Environment verified - all subsequent code MUST be guided by the bundled docs.

---

## Phase 3: Foundational Architecture (Blocking Prerequisites)

**Purpose**: Core infrastructure strictly informed by Next.js 16.2+ documentation (via `AGENTS.md`)

- [x] T008 Setup Zod schema for `DocumentationLesson` in `src/models/lesson.ts` (Follow latest Zod/TS patterns from bundled docs)
- [x] T009 Implement `DocumentationLoader` in `src/lib/docs-loader.ts` to read from `node_modules/next/dist/docs/` (Use `fs` patterns recommended in Next.js 16 docs)
- [x] T010 Configure Shiki for syntax highlighting in `src/lib/shiki-config.ts`
- [x] T011 [P] Create shared UI shell with sidebar container in `src/app/layout.tsx` (Use Tailwind 4.0 patterns from docs)
- [x] T012 [P] Setup base error boundary and loading states in `src/app/loading.tsx` and `src/app/error.tsx`

---

## Phase 4: User Story 1 - Project Reset and Environment Setup (Priority: P1) 🎯 MVP

**Goal**: Verify the clean, standard foundation and deployment workflow integrity.

**Independent Test**: Verify `.github/` exists, `package.json` reflects Next.js 16.2.2, and `.specify/` is correctly configured.

### Implementation for User Story 1

- [x] T013 [US1] Validate `.github/` directory and its content (workflows/deploy.yml) are intact
- [x] T014 [US1] Validate `package.json` dependencies and scripts match the requested Next.js setup
- [x] T015 [US1] Validate `tsconfig.json` and `next.config.ts` alignment with implementation plan
- [x] T016 [US1] Validate `.specify/init-options.json` matches previous sequential numbering and Gemini configuration

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 5: User Story 3 - MVP Lesson Rendering (Priority: P3)

**Goal**: Render the first lesson from official Next.js documentation in the local UI.

**Independent Test**: Visit `http://localhost:3000` and see "Getting Started" content rendered with syntax highlighting.

### Implementation for User Story 3

- [x] T017 [US3] Implement `findFirstLesson` function in `src/lib/docs-loader.ts`
- [x] T018 [US3] Create `Sidebar` component in `src/components/Sidebar.tsx` to list sections from `node_modules`
- [x] T019 [US3] Create `MDXRenderer` component in `src/components/MDXRenderer.tsx` using latest Next.js 16 patterns
- [x] T020 [US3] Create `LessonView` component in `src/components/LessonView.tsx` with "AI Source" indicator footer
- [x] T021 [US3] Implement dynamic route for documentation in `src/app/lessons/[...slug]/page.tsx`
- [x] T022 [US3] Update root page `src/app/page.tsx` to redirect to or render the first lesson

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T023 [P] Apply Tailwind 4.0 typography styling in `src/app/globals.css`
- [x] T024 Code cleanup and removal of initialization scripts if no longer needed
- [x] T025 Final validation of all `quickstart.md` steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: MUST start immediately.
- **AI Environment (Phase 2)**: Depends on Phase 1 completion. BLOCKS all architecture.
- **Foundational (Phase 3)**: Depends on Phase 2 (must be informed by docs).
- **User Stories (Phase 4-5)**: Depend on Foundational phase completion.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### Parallel Opportunities

- T011 and T012 (UI Shell/Error boundaries) can run in parallel within Phase 3.
- US1 (T013-T016) can be validated while US3 (T017-T022) is being implemented once foundations are ready.
- T023 (Styling) can run in parallel with polish tasks.

---

## Implementation Strategy

### AI-Informed MVP

1. Complete Phase 1: Setup.
2. Complete Phase 2: AI Environment (Verify `AGENTS.md` - Essential for agents to build Phase 3+ correctly).
3. Complete Phase 3: Foundational (Building based on Phase 2 knowledge).
4. Complete Phase 4: User Story 1 (Verification).
5. Complete Phase 5: User Story 3 (MVP UI).

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story for traceability.
- `AGENTS.md` is now the mandatory guide for Phase 3 onwards.
- Exclude `.github/` at all costs during the reset phase.
