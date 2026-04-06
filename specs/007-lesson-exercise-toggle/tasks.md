# Tasks: Toggle Lesson and Exercise Visibility

**Input**: Design documents from `specs/007-lesson-exercise-toggle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests are NOT explicitly requested in the spec, so implementation will focus on functional logic and manual verification per quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project state verification

- [x] T001 Verify project build and lint status before starting changes
- [x] T002 [P] Ensure `lucide-react` is available in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for the visibility toggle

- [x] T003 Create `src/components/LessonViewManager.tsx` shell with basic `view` state and props
- [x] T004 Define `LessonViewManagerProps` in `src/components/LessonViewManager.tsx`

---

## Phase 3: User Story 1 - Start and Cancel Exercise (Priority: P1) 🎯 MVP

**Goal**: Switch between reading the lesson content and performing the exercise with a toggle button.

**Independent Test**: Click "Start Exercise" to hide lesson/show exercise; click "Cancel" to revert and reset state.

### Implementation for User Story 1

- [x] T005 [P] Update `ExerciseSectionProps` in `src/components/ExerciseSection.tsx` to include `onProgressChange` callback
- [x] T006 [US1] Implement progress detection in `src/components/ExerciseSection.tsx` (set `onProgressChange(true)` when answer is typed)
- [x] T007 [US1] Implement `LessonViewManager` logic in `src/components/LessonViewManager.tsx`:
    - Toggle visibility of `lessonContent` and `exerciseSection` based on `view` state
    - Implement FAB (Floating Action Button) with dynamic text ("Start Exercise" / "Cancel")
    - Handle cancel logic: `window.confirm` if progress made, then increment `attemptId` and switch to `'lesson'`
- [x] T008 [US1] Integrate `LessonViewManager` into `src/app/lessons/[section]/[lesson]/page.tsx` wrapping main content
- [x] T009 [US1] Apply `attemptId` as `key` to `ExerciseSection` within `LessonViewManager.tsx` to ensure state reset on cancel

**Checkpoint**: User Story 1 is functional: Toggle works, visibility is exclusive, and "Cancel" resets the exercise state.

---

## Phase 4: User Story 2 - Complete Exercise (Priority: P2)

**Goal**: Automatically return to lesson view and reset exercise state upon completion.

**Independent Test**: Complete an exercise and verify the view returns to the lesson with a reset exercise state.

### Implementation for User Story 2

- [x] T010 [P] [US2] Update `ExerciseSectionProps` in `src/components/ExerciseSection.tsx` to include `onComplete` callback
- [x] T011 [US2] Trigger `onComplete` in `src/components/ExerciseSection.tsx` when `status === 'correct'`
- [x] T012 [US2] Handle `onComplete` in `src/components/LessonViewManager.tsx`:
    - Increment `attemptId`
    - Switch `view` to `'lesson'`

**Checkpoint**: User Story 2 is functional: Completing an exercise triggers the same reset and return logic as "Cancel".

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T013 [P] Add transition animations (Tailwind `transition-all`, `duration-300`) to `LessonViewManager.tsx` for smoother view swaps
- [x] T014 [P] Update `README.md` or internal documentation if necessary
- [x] T015 Final validation using `specs/007-lesson-exercise-toggle/quickstart.md` verification steps
- [x] T016 Run `npm test && npm run lint` to ensure no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Blocks Phase 3 and 4.
- **User Story 1 (Phase 3)**: MVP goal. Should be completed first.
- **User Story 2 (Phase 4)**: Depends on US1 completion as it reuses the reset logic.
- **Polish (Phase 5)**: Final cleanup.

### Parallel Opportunities

- T005 and T010 can be done together as they involve updating `ExerciseSection` props.
- T013 and T014 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and 2.
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE**: Verify the toggle and reset-on-cancel work.

### Incremental Delivery

1. Foundation ready (T003-T004).
2. Toggle and Cancel (US1) -> Complete MVP.
3. Auto-reset on completion (US2).
4. Final Polish.

---

## Notes

- `attemptId` as `key` is the primary mechanism for SC-002 (reliable state clearing).
- FAB placement ensures SC-003 (always visible/sticky).
- No new entities or database changes required; purely UI/UX state management.
