'use client';

import * as React from 'react';
import { type Exercise } from '@/lib/schemas';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { useProgressStore } from '@/lib/store';

interface ExerciseSectionProps {
  exercise: Exercise;
  lessonId: string;
}

export default function ExerciseSection({ exercise, lessonId }: ExerciseSectionProps) {
  const [answer, setAnswer] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = React.useState(false);
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const isCompleted = useProgressStore((state) => state.completedLessonIds.includes(lessonId));

  React.useEffect(() => {
    if (isCompleted) {
      setStatus('correct');
      setAnswer(exercise.correctValue.toString());
    }
  }, [isCompleted, exercise.correctValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === exercise.correctValue.toString().toLowerCase()) {
      setStatus('correct');
      completeLesson(lessonId);
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className={`glass rounded-xl border-white/10 p-6 space-y-4 transition-all ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Challenge</h3>
        </div>
        {isCompleted && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-1 rounded">
            Completed
          </span>
        )}
      </div>
      
      <p className="text-gray-300">{exercise.prompt}</p>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
          disabled={isCompleted}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={isCompleted}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500"
        >
          Check
        </button>
      </form>
      
      {status === 'correct' && (
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">Correct! Great job mastering this concept.</p>
        </div>
      )}
      
      {status === 'incorrect' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-in fade-in slide-in-from-top-1">
            <XCircle className="w-5 h-5" />
            <p className="font-medium">Not quite. Try again!</p>
          </div>
          {!showHint && exercise.hint && (
            <button 
              onClick={() => setShowHint(true)}
              className="text-xs text-gray-500 hover:text-gray-400 text-left px-1"
            >
              Need a hint?
            </button>
          )}
          {showHint && (
            <p className="text-xs text-blue-400/80 italic px-1">
              Hint: {exercise.hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
