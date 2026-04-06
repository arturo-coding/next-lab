'use client';

import * as React from 'react';
import { PlayCircle, XCircle } from 'lucide-react';

import { type Exercise } from '@/lib/schemas';
import ExerciseSection from './ExerciseSection';

interface LessonViewManagerProps {
  lessonContent: React.ReactNode;
  exercise: Exercise;
  lessonId: string;
}

type ViewMode = 'lesson' | 'exercise';

export default function LessonViewManager({
  lessonContent,
  exercise,
  lessonId,
}: LessonViewManagerProps) {
  const [view, setView] = React.useState<ViewMode>('lesson');
  const [attemptId, setAttemptId] = React.useState(0);
  const [hasProgress, setHasProgress] = React.useState(false);

  const handleComplete = () => {
    // When completed, reset and return to lesson view
    setAttemptId((prev) => prev + 1);
    setHasProgress(false);
    setView('lesson');
  };

  const toggleView = () => {
    if (view === 'exercise' && hasProgress) {
      const confirmed = window.confirm(
        'You have unsaved progress in this exercise. Are you sure you want to cancel? Your progress will be reset.'
      );
      if (!confirmed) return;
    }

    if (view === 'exercise') {
      // If we are canceling/returning from exercise, reset it
      setAttemptId((prev) => prev + 1);
      setHasProgress(false);
    }

    setView((prev) => (prev === 'lesson' ? 'exercise' : 'lesson'));
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 h-full">
          {view === 'lesson' ? (
            lessonContent
          ) : (
            <div key={attemptId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ExerciseSection 
                exercise={exercise} 
                lessonId={lessonId} 
                onProgressChange={setHasProgress}
                onComplete={handleComplete}
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={toggleView}
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 ${
          view === 'lesson'
            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
            : 'bg-red-600/20 text-red-400 border border-red-500/30 backdrop-blur-md hover:bg-red-600/30 shadow-red-500/10'
        }`}
      >
        {view === 'lesson' ? (
          <>
            <PlayCircle className="w-5 h-5" />
            Start Exercise
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5" />
            Cancel
          </>
        )}
      </button>
    </div>
  );
}
