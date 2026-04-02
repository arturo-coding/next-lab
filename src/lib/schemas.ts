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

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
});

export const ProgressSchema = z.object({
  completedLessonIds: z.array(z.string()).default([]),
  lastAccessedLessonId: z.string().optional(),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Progress = z.infer<typeof ProgressSchema>;
