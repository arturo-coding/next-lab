import fs from 'fs/promises';
import path from 'path';
import { LessonSchema, SectionSchema, type Lesson, type Section } from './schemas';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

export async function getSections(): Promise<Section[]> {
  const sectionsPath = path.join(CONTENT_PATH, 'sections.json');
  try {
    const content = await fs.readFile(sectionsPath, 'utf-8');
    const data = JSON.parse(content);
    return data.map((s: Section) => SectionSchema.parse(s)).sort((a: Section, b: Section) => a.order - b.order);
  } catch (error) {
    console.error('Error loading sections:', error);
    return [];
  }
}

export async function getLessons(sectionId: string): Promise<Lesson[]> {
  const lessonsDir = path.join(CONTENT_PATH, 'lessons', sectionId);
  try {
    const files = await fs.readdir(lessonsDir);
    const lessons = await Promise.all(
      files
        .filter(f => f.endsWith('.json'))
        .map(async f => {
          const content = await fs.readFile(path.join(lessonsDir, f), 'utf-8');
          return LessonSchema.parse(JSON.parse(content));
        })
    );
    return lessons;
  } catch (error) {
    console.error(`Error loading lessons for section ${sectionId}:`, error);
    return [];
  }
}

export async function getLesson(sectionId: string, lessonId: string): Promise<Lesson | null> {
  const lessonPath = path.join(CONTENT_PATH, 'lessons', sectionId, `${lessonId}.json`);
  try {
    const content = await fs.readFile(lessonPath, 'utf-8');
    return LessonSchema.parse(JSON.parse(content));
  } catch (error) {
    console.error(`Error loading lesson ${lessonId} in section ${sectionId}:`, error);
    return null;
  }
}
