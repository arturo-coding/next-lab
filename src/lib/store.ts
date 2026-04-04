import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedLessonIds: string[];
  completeLesson: (id: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessonIds: [],
      completeLesson: (id) => 
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(id) 
            ? state.completedLessonIds 
            : [...state.completedLessonIds, id]
        })),
      resetProgress: () => set({ completedLessonIds: [] }),
    }),
    {
      name: 'next-lab-progress',
    }
  )
);
