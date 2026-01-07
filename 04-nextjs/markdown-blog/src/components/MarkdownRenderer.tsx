'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          // Custom code block rendering for better AI output support
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          // Enhanced table styling
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-semibold">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {children}
              </td>
            );
          },
          // Enhanced blockquote styling for AI responses
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic">
                {children}
              </blockquote>
            );
          },
          // Enhanced list styling
          ul({ children }) {
            return (
              <ul className="list-disc list-inside my-4 space-y-1">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-inside my-4 space-y-1">
                {children}
              </ol>
            );
          },
          // Enhanced heading styles
          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-bold mt-6 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {children}
              </h3>
            );
          },
          // Enhanced math styling for KaTeX
          span({ children, ...props }) {
            if (props.className?.includes('katex')) {
              return <span className="inline-block" {...props}>{children}</span>;
            }
            return <span {...props}>{children}</span>;
          },
          // Handle math display blocks
          div({ children, ...props }) {
            if (props.className?.includes('katex-display')) {
              return <div className="my-6 text-center overflow-x-auto" {...props}>{children}</div>;
            }
            return <div {...props}>{children}</div>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}