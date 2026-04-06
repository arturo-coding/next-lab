# Feature Specification: Toggle Lesson and Exercise Visibility

**Feature Branch**: `007-lesson-exercise-toggle`  
**Created**: April 4, 2026  
**Status**: Draft  
**Input**: User description: "La sección del ejercicio de cada lección debe estar separada terminos de visibilidad para el usuario, es decir, si el ejercico esta iniciado, la lección ya no debe mostrarse y vicebersa, por lo que debe de haber un botón de para inicar el ejercicio y que se transforme en cancelar que cancelará el ejercicio y se mostrará la lección de nuevo y se ocultará el ejercicio, el ejercicio tiene que volver a su estado inicial siempre que se cancele o que se termine."

## Clarifications

### Session 2026-04-04
- Q: Where should the "Start Exercise / Cancel" toggle button be positioned? → A: Sticky header or floating action button (always visible)
- Q: Should the system prompt for confirmation before cancelling an exercise? → A: Prompt only if inputs have been modified

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start and Cancel Exercise (Priority: P1)

As a learner, I want to switch between reading the lesson content and performing the exercise so that I can focus on one activity at a time.

**Why this priority**: Core requirement for the visibility toggle and distraction-free learning.

**Independent Test**: Can be tested by clicking the "Start Exercise" button to hide the lesson and show the exercise, then clicking "Cancel" to revert.

**Acceptance Scenarios**:

1. **Given** I am on a lesson page, **When** I click "Start Exercise", **Then** the lesson content is hidden, the exercise section is shown, and the button text changes to "Cancel".
2. **Given** I am in the exercise view, **When** I click "Cancel", **Then** the exercise section is hidden, the lesson content is shown again, and the exercise state is reset to its initial values.

---

### User Story 2 - Complete Exercise (Priority: P2)

As a learner, I want the system to handle the transition automatically when I finish an exercise.

**Why this priority**: Ensures consistent behavior after completion.

**Independent Test**: Complete an exercise and verify the view returns to the lesson with a reset exercise state.

**Acceptance Scenarios**:

1. **Given** I am performing an exercise, **When** I complete all tasks in the exercise, **Then** the view returns to the lesson content and the exercise is reset to its initial state.

### Edge Cases

- **Page Refresh**: If a user refreshes the page while in "Exercise View", the system defaults back to "Lesson View".
- **Unsaved Progress**: If a user cancels an exercise halfway through, all current progress is lost as it resets to the initial state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a toggle button to switch between "Lesson View" (default) and "Exercise View".
- **FR-002**: System MUST hide all lesson content when "Exercise View" is active.
- **FR-003**: System MUST hide the exercise section when "Lesson View" is active.
- **FR-004**: System MUST reset the exercise state (all user inputs and progress) when switching from "Exercise View" back to "Lesson View" via cancellation or completion.
- **FR-005**: The toggle button MUST display "Start Exercise" when in "Lesson View" and "Cancel" when in "Exercise View".
- **FR-006**: System MUST prompt for user confirmation before cancelling an exercise IF any input has been modified or progress has been made.

### Key Entities

- **Lesson**: Represents the educational content and its associated exercise.
- **Exercise**: Represents the interactive task associated with a lesson, including its current state and completion status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of users can successfully toggle between lesson and exercise views without page reloads.
- **SC-002**: Exercise state is reliably cleared 100% of the time upon cancellation or completion.
- **SC-003**: View transitions occur instantly (under 100ms) to ensure a smooth user experience.

## Assumptions

- The "initial state" of an exercise means all inputs are cleared and steps are reset to the beginning.
- The "Finish" action is defined by the existing exercise logic within each lesson.
- Visual transitions should be clean but do not require complex animations unless requested.
