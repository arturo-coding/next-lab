import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "@/lib/shiki-config";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcLight?: string;
  srcDark?: string;
}

// Custom components for MDX
const components = {
  AppOnly: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  PagesOnly: () => null,
  Image: ({ srcLight, srcDark, ...props }: ImageProps) => {
    const src = props.src || srcLight;
    
    if (srcLight && srcDark) {
      return (
        <div className="my-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            {...props} 
            src={srcLight}
            className="w-full h-auto block dark:hidden" 
            alt={props.alt || "Documentation image"} 
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            {...props} 
            src={srcDark}
            className="w-full h-auto hidden dark:block" 
            alt={props.alt || "Documentation image"} 
          />
        </div>
      );
    }
    
    return (
      <div className="my-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          {...props} 
          src={src}
          className="w-full h-auto" 
          alt={props.alt || "Documentation image"} 
        />
      </div>
    );
  },
  Check: ({ size = 18 }: { size?: number }) => (
    <span style={{ width: size, height: size }} className="inline-block text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </span>
  ),
  Cross: ({ size = 18 }: { size?: number }) => (
    <span style={{ width: size, height: size }} className="inline-block text-red-500">
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </span>
  ),
  pre: async ({ children }: { children: React.ReactElement<{ children: string; className?: string }> }) => {
    // Basic implementation to extract code and lang
    // This is a simplified version for MVP
    const code = children?.props?.children || "";
    const className = children?.props?.className || "";
    const lang = className.replace("language-", "") || "text";
    
    const html = await highlight(code, lang);
    
    return <div dangerouslySetInnerHTML={{ __html: html }} className="my-6" />;
  },
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-12 mb-6" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="leading-relaxed mb-4 text-zinc-700 dark:text-zinc-300" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="text-zinc-700 dark:text-zinc-300" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
};

export default function MDXRenderer({ content }: { content: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
