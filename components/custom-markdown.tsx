import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedReactMarkdown } from "./markdown";
import { CodeBlock } from "./ui/codeblock";

export const CustomMarkdown = ({ content, ...props }: { content: string }) => {
  return (
    <MemoizedReactMarkdown
      className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        a: ({ node, ...props }) => (
          <a
            target=" "
            rel="noopener noreferrer"
            {...props}
            className="font-medium underline text-blue-300 transition-colors"
          />
        ),
        h1: ({ node, ...props }) => (
          <h1 {...props} className="mb-2 text-3xl font-bold md:text-4xl" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="mb-6 text-2xl font-bold md:text-3xl" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="mb-2 mt-4 text-xl font-bold md:text-2xl" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="list-decimal pl-5" />
        ),
        li: ({ node, ...props }) => <li {...props} className="mb-1" />,
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == "▍") {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              );
            }

            children[0] = (children[0] as string).replace("`▍`", "▍");
          }

          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          );
        },
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  );
};
