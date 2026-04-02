import { createHighlighter } from 'shiki';

let highlighter: any = null;

export async function getHighlighterInstance() {
  if (highlighter) return highlighter;
  
  highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: ['typescript', 'tsx', 'javascript', 'jsx', 'css', 'json']
  });
  
  return highlighter;
}

export async function highlightCode(code: string, lang: string = 'tsx') {
  const h = await getHighlighterInstance();
  return h.codeToHtml(code, {
    lang,
    theme: 'github-dark'
  });
}
