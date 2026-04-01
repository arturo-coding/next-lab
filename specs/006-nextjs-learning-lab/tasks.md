# Tasks: Next.js Learning Lab

**Input**: Design documents from `/specs/006-nextjs-learning-lab/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 15 project with TypeScript (strict mode) and Tailwind CSS
- [ ] T002 [P] Install core dependencies: `zod`, `react-resizable-panels`, `shiki`, `lucide-react`
- [ ] T003 [P] Configure global styles and Tailwind design tokens in `src/app/globals.css`
- [ ] T004 Setup basic directory structure: `src/app`, `src/components`, `src/lib`, `src/content`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 [P] Create Zod schemas for Section, Lesson, and Progress in `src/lib/schemas.ts`
- [ ] T006 Implement content loader utility to parse MDX/Markdown in `src/lib/content-loader.ts`
- [ ] T007 Create root layout with a responsive container in `src/app/layout.tsx`
- [ ] T008 [P] Configure Shiki highlighter instance in `src/lib/shiki-config.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Structured Lesson Navigation (Priority: P1) 🎯 MVP

**Goal**: Navigate through lessons grouped by official documentation sections.

**Independent Test**: Sidebar displays all sections/lessons from `src/content`, and clicking one navigates to the correct URL.

- [ ] T009 [P] [US1] Create sample lesson content files in `src/content/lessons/routing/linking.md` and `src/content/lessons/data-fetching/fetching.md`
- [ ] T010 [US1] Implement `Sidebar` component (RSC) to fetch and display navigation in `src/components/Sidebar.tsx`
- [ ] T011 [US1] Setup dynamic route segment for lessons in `src/app/lessons/[section]/[lesson]/page.tsx`
- [ ] T012 [US1] Integrate `Sidebar` into the main layout in `src/app/layout.tsx`

**Checkpoint**: User Story 1 functional - basic navigation works.

---

## Phase 4: User Story 2 - Side-by-Side Code & Render (Priority: P1) 🎯 MVP

**Goal**: See code examples and their rendered output side-by-side.

**Independent Test**: Lesson page displays a syntax-highlighted code block and a live preview component in a resizable split view.

- [ ] T013 [P] [US2] Implement `SyntaxHighlighter` component using Shiki in `src/components/SyntaxHighlighter.tsx`
- [ ] T014 [US2] Create resizable `SplitView` component using `react-resizable-panels` in `src/components/SplitView.tsx`
- [ ] T015 [US2] Implement dynamic preview component registry and loader in `src/components/lessons/index.ts`
- [ ] T016 [US2] Create first preview component for a lesson in `src/components/lessons/RoutingExample.tsx`
- [ ] T017 [US2] Assemble `SplitView`, `SyntaxHighlighter`, and preview component in `src/app/lessons/[section]/[lesson]/page.tsx`

**Checkpoint**: User Story 2 functional - the core side-by-side experience is ready.

---

## Phase 5: User Story 3 - Interactive Exercises (Priority: P2)

**Goal**: Complete interactive exercises for each lesson with immediate feedback.

**Independent Test**: Exercise section at the bottom of a lesson validates user input/action and displays feedback.

- [ ] T018 [P] [US3] Create base `ExerciseSection` client component in `src/components/ExerciseSection.tsx`
- [ ] T019 [US3] Implement validation logic using Zod schemas for different exercise types in `src/lib/exercise-validation.ts`
- [ ] T020 [US3] Add interactive UI elements (inputs/buttons) to `ExerciseSection` based on lesson metadata
- [ ] T021 [US3] Integrate `ExerciseSection` into the lesson page in `src/app/lessons/[section]/[lesson]/page.tsx`

**Checkpoint**: User Story 3 functional - interactive learning loop complete.

---

## Phase 6: User Story 4 - Progress Tracking (Priority: P3)

**Goal**: Save completed lessons and show progress markers.

**Independent Test**: Completing an exercise marks the lesson as done in the sidebar (persisted across refreshes).

- [ ] T022 [P] [US4] Implement `useProgress` hook using `localStorage` in `src/hooks/useProgress.ts`
- [ ] T023 [US4] Create Server Action to handle progress updates (mocking persistence) in `src/app/actions/progress.ts`
- [ ] T024 [US4] Update `Sidebar` component to display completion checkmarks in `src/components/Sidebar.tsx`
- [ ] T025 [US4] Trigger progress update upon successful exercise completion in `src/components/ExerciseSection.tsx`

**Checkpoint**: User Story 4 functional - full learning journey tracked.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Visual refinements, mobile responsiveness, and performance.

- [ ] T026 [P] Implement responsive "stacked" view for mobile screens in `src/components/SplitView.tsx`
- [ ] T027 [P] Add glassmorphism and animations (Framer Motion) to UI in `src/components/ui/`
- [ ] T028 Performance audit: Ensure lessons load under 500ms (SC-002)
- [ ] T029 [P] Final Documentation update in `README.md` and `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Initial project bootstrap.
- **Foundational (Phase 2)**: Requires Setup. **BLOCKS** all user stories.
- **US1 & US2 (Phase 3-4)**: Can proceed in parallel after Phase 2, but US2 depends on US1's routing structure.
- **US3 (Phase 5)**: Depends on US2 (needs a lesson page to live in).
- **US4 (Phase 6)**: Depends on US1 (sidebar markers) and US3 (completion trigger).
- **Polish (Final)**: Depends on core stories.

### Parallel Opportunities

- T002, T003 can run in parallel during Setup.
- T005, T008 can run in parallel during Foundational.
- US1 (Navigation) and US2 (View) can be worked on concurrently by different developers once routes are defined.
- Most [P] tasks within a story phase can run in parallel.

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 1 & 2.
2. Implement US1 (Navigation) and US2 (Side-by-Side View).
3. **STOP and VALIDATE**: Test that a user can navigate and see code/render side-by-side. This constitutes the core value proposition.

### Incremental Delivery

1. Foundation -> Solid base.
2. US1 + US2 -> Core interactive viewer (MVP).
3. US3 -> Active learning layer.
4. US4 -> Gamification/Persistence layer.
5. Polish -> Premium feel.
