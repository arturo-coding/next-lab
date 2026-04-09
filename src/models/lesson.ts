import { z } from "zod";

export const DocumentationLessonSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  path: z.string(),
  section: z.string().min(1),
});

export type DocumentationLesson = z.infer<typeof DocumentationLessonSchema>;

export const LessonMetadataSchema = z.object({
  title: z.string(),
  nav_title: z.string().optional(),
  description: z.string().optional(),
});

export type LessonMetadata = z.infer<typeof LessonMetadataSchema>;
