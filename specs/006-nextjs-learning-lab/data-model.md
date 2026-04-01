# Data Model: Next.js Learning Lab

## Entities

### Section (Static/Metadata)
Represents a grouping of related lessons following official docs.
- `id`: string (e.g., "routing")
- `title`: string (e.g., "Routing")
- `order`: number

### Lesson (Static/Content)
An individual tutorial/demo unit.
- `id`: string (e.g., "linking-navigating")
- `sectionId`: string (foreign key to Section)
- `title`: string
- `description`: string (Markdown)
- `code`: string (Source for the example)
- `previewComponent`: string (Name of the React component to render)
- `exercise`: Exercise (Embedded task)

### Exercise (Embedded)
Task associated with a Lesson.
- `type`: "choice" | "action" | "code"
- `prompt`: string
- `correctValue`: string | boolean
- `hint`: string (optional)

### Progress (Persistence)
Tracks user mastery across lessons.
- `completedLessonIds`: string[] (Stored in `localStorage`)
- `lastAccessedLessonId`: string
- `stats`: object (e.g., completion percentage)

## Zod Schemas (lib/schemas.ts)

```typescript
import { z } from 'zod';

export const ExerciseSchema = z.object({
  type: z.enum(['choice', 'action', 'code']),
  prompt: z.string(),
  correctValue: z.string().or(z.boolean()),
  hint: z.string().optional(),
});

export const LessonSchema = z.object({
  id: z.string(),
  sectionId: z.string(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  previewComponent: z.string(),
  exercise: ExerciseSchema,
});

export const ProgressSchema = z.object({
  completedLessonIds: z.array(z.string()).default([]),
  lastAccessedLessonId: z.string().optional(),
});
```
