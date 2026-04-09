import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { LessonMetadataSchema, DocumentationLesson } from "@/models/lesson";

const DOCS_PATH = path.join(process.cwd(), "node_modules/next/dist/docs");

export async function getLessonBySlug(slug: string[]): Promise<DocumentationLesson | null> {
  try {
    const fullPath = path.join(DOCS_PATH, ...slug) + ".md";
    const mdxPath = path.join(DOCS_PATH, ...slug) + ".mdx";
    
    let filePath = "";
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      // Check for index files
      const indexPath = path.join(DOCS_PATH, ...slug, "index.md");
      const indexMdxPath = path.join(DOCS_PATH, ...slug, "index.mdx");
      if (fs.existsSync(indexPath)) filePath = indexPath;
      else if (fs.existsSync(indexMdxPath)) filePath = indexMdxPath;
      else return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    const metadata = LessonMetadataSchema.parse(data);
    const section = slug.length > 1 ? slug[0] : "Root";

    return {
      slug: slug.join("/"),
      title: metadata.nav_title || metadata.title,
      content,
      path: filePath,
      section,
    };
  } catch (error) {
    console.error("Error loading lesson:", error);
    return null;
  }
}

export async function getFirstLesson(): Promise<DocumentationLesson | null> {
  // Hardcoded entry point for MVP based on Next.js 16 structure
  return getLessonBySlug(["01-app", "01-getting-started", "01-installation"]);
}

export async function getAllLessonSlugs(): Promise<string[][]> {
  const slugs: string[][] = [];

  function walk(dir: string, currentSlug: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath, [...currentSlug, file]);
      } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
        const name = file.replace(/\.mdx?$/, "");
        if (name === "index") {
          slugs.push(currentSlug);
        } else {
          slugs.push([...currentSlug, name]);
        }
      }
    }
  }

  if (fs.existsSync(DOCS_PATH)) {
    walk(DOCS_PATH);
  }
  
  return slugs;
}
