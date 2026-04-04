import { highlightCode } from '@/lib/shiki-config';

interface SyntaxHighlighterProps {
  code: string;
  lang?: string;
}

export default async function SyntaxHighlighter({ code, lang = 'tsx' }: SyntaxHighlighterProps) {
  const html = await highlightCode(code, lang);
  
  return (
    <div 
      className="h-full overflow-auto p-4 text-sm font-mono bg-[#0d1117]" 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
