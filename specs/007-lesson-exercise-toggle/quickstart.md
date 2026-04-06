# Quickstart: Toggle Lesson and Exercise Visibility

## Implementation Steps

### 1. Create LessonViewManager Component
- **Location**: `src/components/LessonViewManager.tsx`
- **Purpose**: Manage the visibility state of the lesson and exercise.
- **Props**: `lessonContent: React.ReactNode`, `exerciseSection: React.ReactNode`.

### 2. Update ExerciseSection for Progress Detection
- **Modification**: Pass a `onProgressChange` callback prop to `ExerciseSection` to let `LessonViewManager` know if there's unsaved progress.

### 3. Implement Toggle Button (FAB)
- **Style**: Floating action button in the bottom-right corner.
- **Logic**: 
  - Switch `view` between `'lesson'` and `'exercise'`.
  - On cancel, prompt user IF `hasProgress` is true.
  - Increment `attemptId` on cancel or completion.

### 4. Integrate into Lesson Page
- **File**: `src/app/lessons/[section]/[lesson]/page.tsx`
- **Action**: Wrap the lesson content and `ExerciseSection` within the `LessonViewManager`.

## Verification Steps
1.  Verify clicking "Start Exercise" hides the lesson and shows the challenge.
2.  Verify the button text changes to "Cancel".
3.  Type something in the challenge, then click "Cancel". Verify the `window.confirm` prompt appears.
4.  Verify clicking "Cancel" (and confirming) hides the challenge, shows the lesson, and resets the challenge input.
5.  Complete the challenge and verify it returns to the lesson view and resets.
