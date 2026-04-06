# Implementation Plan: Toggle Lesson and Exercise Visibility

**Feature Branch**: `007-lesson-exercise-toggle`  
**Created**: April 4, 2026  
**Status**: Draft  
**Spec**: [spec.md](./spec.md)

## Technical Context

### Architecture & Tech Stack
- **Framework**: Next.js 15 (App Router, RSC-first).
- **Styling**: Tailwind CSS.
- **State Management**: React `useState` for local UI toggle and `useProgressStore` (Zustand) for lesson completion.
- **Components**: `ExerciseSection` (Client), `LessonPage` (Server).

### Constraints & Assumptions
- **Constraint**: `LessonPage` must remain a Server Component for SEO and performance.
- **Assumption**: The exercise state reset can be achieved by remounting the `ExerciseSection` component using a `key` prop.
- **Assumption**: `window.confirm` is acceptable for the cancellation prompt as per the clarification.

### External Dependencies
- `lucide-react` for icons.
- `zustand` for progress state.

## Constitution Check

### Principles
- **I. Server-First Architecture (RSC)**: 
  - *Compliance*: `LessonPage` remains RSC; interactivity is isolated in `LessonViewManager` and `ExerciseSection`.
- **II. Official Next.js 15 Standards**:
  - *Compliance*: Uses App Router and official component patterns.
- **III. Utility-First Styling (Tailwind CSS)**:
  - *Compliance*: All visibility toggles and FAB styling use Tailwind classes.
- **IV. Mandatory Type-Safe Correctness**:
  - *Compliance*: TypeScript used for all new components and props.
- **V. Simplified Foundations & Educational Clarity**:
  - *Compliance*: Using a simple `view` state and `key` for resetting is intuitive and easy to follow.

## Phase 0: Outline & Research
- **Research complete**: See [research.md](./research.md).
- **Key finding**: Use a `LessonViewManager` Client Component and a `key` prop for resetting exercise state.

## Phase 1: Design & Contracts
- **Data Model**: See [data-model.md](./data-model.md).
- **Quickstart**: See [quickstart.md](./quickstart.md).
- **Artifacts**:
  - `src/components/LessonViewManager.tsx` (New)
  - `src/app/lessons/[section]/[lesson]/page.tsx` (Updated)
  - `src/components/ExerciseSection.tsx` (Updated)

## Phase 2: Implementation & Validation

### Tasks
1.  **Modify `ExerciseSection.tsx`**: Add `onProgressChange` and handle initial state.
2.  **Create `LessonViewManager.tsx`**: Implement `view` state, `attemptId`, and the FAB toggle button.
3.  **Update `LessonPage.tsx`**: Integrate `LessonViewManager` to wrap content and exercise.
4.  **Validation**: Run through the [Quickstart verification steps](./quickstart.md#verification-steps).

## Final Review
- [x] No implementation details leak into specification.
- [x] RSC-first architecture maintained.
- [x] TypeScript/Zod used correctly.
- [x] Functional requirements (FR-001 to FR-006) fully addressed.
