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
  Video: ({ src, ...props }: any) => (
    <div className="my-8 aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <video src={src} controls className="w-full h-full" {...props} />
    </div>
  ),
  Callout: ({ children, type = "default" }: { children: React.ReactNode; type?: string }) => {
    const styles = {
      default: "bg-zinc-50 border-zinc-200 text-zinc-800 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-200",
      warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-200",
      error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-200",
      info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-200",
    };
    const style = styles[type as keyof typeof styles] || styles.default;
    return (
      <div className={`my-6 p-4 rounded-lg border ${style}`}>
        {children}
      </div>
    );
  },
  Card: ({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) => (
    <div className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
    </div>
  ),
  Cards: ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  ),
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
  pre: async ({ children }: { children: React.ReactNode }) => {
    // Basic implementation to extract code and lang
    // This is a simplified version for MVP
    
    // Check if children is a valid React element with props
    if (React.isValidElement(children) && children.props) {
      const code = (children.props as any).children || "";
      const className = (children.props as any).className || "";
      const lang = className.replace("language-", "") || "text";
      
      const html = await highlight(code, lang);
      return <div dangerouslySetInnerHTML={{ __html: html }} className="my-6" />;
    }
    
    // Fallback for cases where children is just text or something else
    const code = children?.toString() || "";
    const html = await highlight(code, "text");
    
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
