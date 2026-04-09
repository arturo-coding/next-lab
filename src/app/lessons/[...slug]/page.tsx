import { notFound } from "next/navigation";
import { getLessonBySlug, getAllLessonSlugs } from "@/lib/docs-loader";
import LessonView from "@/components/LessonView";

export async function generateStaticParams() {
  const slugs = await getAllLessonSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return <LessonView lesson={lesson} />;
}
