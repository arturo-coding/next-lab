'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Section, type Lesson } from '@/lib/schemas';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useProgressStore } from '@/lib/store';

interface SidebarProps {
  sections: Section[];
  lessonsBySection: Record<string, Lesson[]>;
}

export default function Sidebar({ sections, lessonsBySection }: SidebarProps) {
  const pathname = usePathname();
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-72 glass border-r border-white/10 h-screen overflow-y-auto p-6 flex flex-col gap-8 shrink-0">
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
          N
        </div>
        <div className="text-xl font-bold tracking-tight text-white">
          Next.js <span className="text-blue-500">Lab</span>
        </div>
      </div>
      
      <nav className="flex flex-col gap-8">
        {sections.map((section) => {
          const lessons = lessonsBySection[section.id] || [];
          return (
            <div key={section.id} className="flex flex-col gap-3">
              <h3 className="text-[10px] font-bold uppercase text-gray-500 px-3 tracking-[0.2em]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {lessons.map((lesson) => {
                  const href = `/lessons/${section.id}/${lesson.id}`;
                  const isActive = pathname === href;
                  const isCompleted = mounted && completedLessonIds.includes(lesson.id);

                  return (
                    <li key={lesson.id}>
                      <Link
                        href={href}
                        className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive 
                            ? 'bg-blue-600/10 text-blue-400 font-medium' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'rotate-90 text-blue-500' : 'text-gray-600 group-hover:text-gray-400'}`} />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
      
      {mounted && completedLessonIds.length > 0 && (
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/5 rounded-lg p-3 space-y-2">
             <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-wider">
               <span>Progress</span>
               <span>{completedLessonIds.length} lessons</span>
             </div>
             <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-blue-600 transition-all duration-500" 
                 style={{ width: `${Math.min(100, (completedLessonIds.length / 10) * 100)}%` }}
               />
             </div>
          </div>
        </div>
      )}
    </aside>
  );
}
