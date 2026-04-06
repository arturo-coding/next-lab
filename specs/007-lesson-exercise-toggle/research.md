# Research: Toggle Lesson and Exercise Visibility

## Decision: Toggle Implementation Strategy
- **Choice**: Create a `LessonViewManager` Client Component.
- **Rationale**: The `LessonPage` is a Server Component (RSC). To handle the interactive visibility state and the toggle button, we need a Client Component. Wrapping the lesson content and exercise in a dedicated manager allows us to keep the logic contained.
- **Alternatives Considered**: 
    - Handling state in `Sidebar` (too disconnected).
    - Making the entire `LessonPage` a Client Component (violates RSC-first principle).

## Decision: Exercise State Reset
- **Choice**: Use a `key` prop on the `ExerciseSection` component.
- **Rationale**: React's `key` prop is the standard way to force a component to remount and reset its internal state (`useState`, etc.). By incrementing an `attemptId` whenever the exercise is canceled or completed, we ensure a clean slate for the next attempt.
- **Alternatives Considered**: Lifting all exercise state to `LessonViewManager` (adds unnecessary complexity and prop drilling).

## Decision: Toggle Button Placement
- **Choice**: Floating Action Button (FAB) at the bottom-right of the viewport.
- **Rationale**: Clarification 1 allowed a floating action button. This ensures the button is always visible regardless of scroll position and doesn't interfere with the header content or the lesson's main layout.
- **Alternatives Considered**: Sticky header (might conflict with existing header height/layout).

## Decision: Confirmation Prompt
- **Choice**: Browser-native `window.confirm`.
- **Rationale**: Simple, effective, and satisfies FR-006 without adding complex modal UI logic. It's universally understood and keyboard-accessible.
- **Alternatives Considered**: Custom Tailwind modal (more visual work, same functionality).
