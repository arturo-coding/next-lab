import { createHighlighter, Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (highlighter) return highlighter;
  
  highlighter = await createHighlighter({
    themes: ["github-dark", "github-light"],
    langs: ["typescript", "javascript", "bash", "json", "tsx", "jsx", "markdown", "mdx", "css"],
  });
  
  return highlighter;
}

export async function highlight(code: string, lang: string, theme: string = "github-dark") {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    theme,
  });
}
