import { redirect } from "next/navigation";
import { getFirstLesson } from "@/lib/docs-loader";

export default async function Home() {
  const firstLesson = await getFirstLesson();
  
  if (firstLesson) {
    redirect(`/lessons/${firstLesson.slug}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-2xl font-bold mb-4">Welcome to Next.js Lab</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Could not find documentation in node_modules. Please ensure Next.js is installed.
      </p>
    </div>
  );
}
