# Data Model: Lesson Visibility State

## UI State Structure (Local)

### LessonViewManager State
- **view**: `'lesson' | 'exercise'`
  - Default: `'lesson'`
  - Determines which content section is visible.
- **attemptId**: `number`
  - Default: `0`
  - Incremented whenever an exercise is canceled or completed.
  - Used as the `key` prop for `ExerciseSection` to force a reset.
- **hasProgress**: `boolean`
  - Tracks if the user has made any changes in the current exercise.
  - Derived from `ExerciseSection` state or managed via a callback.

## Validation Rules
- `FR-006`: If `hasProgress` is true, the user MUST be prompted before `view` is set back to `'lesson'`.
- `SC-002`: Resetting the exercise must reset all internal states in `ExerciseSection`.

## State Transitions
1.  `'lesson'` → `'exercise'`: Triggered by "Start Exercise".
2.  `'exercise'` → `'lesson'` (Cancel): Prompt if progress made → Increment `attemptId` → Change `view`.
3.  `'exercise'` → `'lesson'` (Finish): Triggered by exercise completion → Increment `attemptId` → Change `view`.
