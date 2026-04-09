import { DocumentationLesson } from "@/models/lesson";
import MDXRenderer from "./MDXRenderer";

export default function LessonView({ lesson }: { lesson: DocumentationLesson }) {
  return (
    <article className="relative">
      <header className="mb-12">
        <div className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">
          {lesson.section.replace(/^\d+-/, "").replace(/-/g, " ")}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">{lesson.title}</h1>
      </header>

      <MDXRenderer content={lesson.content} />

      <footer className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-2 text-sm text-zinc-500">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span>Source: node_modules/next/dist/docs (Local Ground Truth)</span>
        </div>
      </footer>
    </article>
  );
}
