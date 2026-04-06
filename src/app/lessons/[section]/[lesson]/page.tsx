import { notFound } from 'next/navigation';
import { getLesson, getSections, getLessons } from '@/lib/content-loader';
import Sidebar from '@/components/Sidebar';
import SplitView from '@/components/SplitView';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import { PREVIEW_COMPONENTS } from '@/components/lessons';
import { type Lesson } from '@/lib/schemas';

interface PageProps {
  params: Promise<{
    section: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const sections = await getSections();
  const params: { section: string; lesson: string }[] = [];

  for (const section of sections) {
    const lessons = await getLessons(section.id);
    for (const lesson of lessons) {
      params.push({
        section: section.id,
        lesson: lesson.id,
      });
    }
  }

  return params;
}

import LessonViewManager from '@/components/LessonViewManager';

export default async function LessonPage({ params }: PageProps) {
  const { section: sectionId, lesson: lessonId } = await params;
  const lesson = await getLesson(sectionId, lessonId);

  if (!lesson) {
    notFound();
  }

  const sections = await getSections();
  const lessonsBySection: Record<string, Lesson[]> = {};
  
  await Promise.all(
    sections.map(async (sec) => {
      lessonsBySection[sec.id] = await getLessons(sec.id);
    })
  );

  const PreviewComponent = PREVIEW_COMPONENTS[lesson.previewComponent] || (() => <div className="text-gray-500 italic p-8 glass rounded-lg border-white/5 bg-white/5">Preview component not found for {lesson.previewComponent}</div>);

  return (
    <div className="flex min-h-screen bg-black text-gray-100 overflow-hidden">
      <Sidebar sections={sections} lessonsBySection={lessonsBySection} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center px-8 bg-black/50 backdrop-blur-md shrink-0">
          <h1 className="text-lg font-medium text-white">{lesson.title}</h1>
        </header>
        
        <LessonViewManager 
          lessonContent={
            <>
              <div className="space-y-4 shrink-0">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {lesson.description}
                </p>
              </div>
              
              <div className="flex-1 min-h-[500px] flex flex-col gap-8 pb-12">
                <SplitView 
                  left={<SyntaxHighlighter code={lesson.code} />}
                  right={<PreviewComponent />}
                />
              </div>
            </>
          }
          exercise={lesson.exercise}
          lessonId={lesson.id}
        />
      </main>
    </div>
  );
}
