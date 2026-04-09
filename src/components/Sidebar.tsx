import Link from "next/link";
import { getAllLessonSlugs } from "@/lib/docs-loader";

export default async function Sidebar() {
  const slugs = await getAllLessonSlugs();
  
  // Group slugs by section (assuming first part of slug is section)
  const sections: Record<string, string[][]> = {};
  
  slugs.forEach(slug => {
    const sectionName = slug[0] || "General";
    if (!sections[sectionName]) sections[sectionName] = [];
    sections[sectionName].push(slug);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity">
          Next.js Lab
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(sections).map(([sectionName, sectionSlugs]) => (
          <div key={sectionName} className="space-y-2">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2">
              {sectionName.replace(/^\d+-/, "").replace(/-/g, " ")}
            </h3>
            <ul className="space-y-1">
              {sectionSlugs.map(slug => {
                const label = slug[slug.length - 1] || "Introduction";
                const href = `/lessons/${slug.join("/")}`;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block px-2 py-1.5 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                      {label.replace(/^\d+-/, "").replace(/-/g, " ")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
