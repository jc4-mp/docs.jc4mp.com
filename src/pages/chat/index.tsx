import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader, LoaderCircle, Copy, Check } from "lucide-react";

/**
 * Renders a syntax-highlighted code block using Prism.
 * Accepts content and a className like `language-lua`.
 */
function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const { colorMode } = useColorMode();
  const language = className?.replace(/language-/, "") || "text";
  const [copied, setCopied] = useState(false);

  // Map common language aliases to Prism language names
  const languageMap: { [key: string]: string } = {
    lua: "lua",
  };

  const prismLanguage = languageMap[language.toLowerCase()] || "text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={styles.codeBlockContainer}>
      <Highlight
        code={children.trim()}
        language={prismLanguage}
        theme={colorMode === "dark" ? themes.vsDark : themes.vsLight}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <button
        className={styles.copyButton}
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

/**
 * A styled anchor element that opens https links in a new tab.
 */
function CustomLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const isHttps = href?.startsWith("https");
  const sanitizedHref = href ? href.replace(/\.+$/, "") : href;

  return (
    <a
      href={sanitizedHref}
      target={isHttps ? "_blank" : undefined}
      rel={isHttps ? "noopener noreferrer" : undefined}
      className={styles.markdownLink}
    >
      {children}
    </a>
  );
}

/**
 * Converts plain URLs in text to markdown links, while preserving existing markdown links.
 * Handles:
 * - Proper markdown links/images (preserved)
 * - Bracketed URLs like `[https://example.com]`
 * - Angle-bracket URLs like `<https://example.com>`
 * - Bare URLs like `https://example.com`
 * Skips conversion inside code spans/blocks.
 */
function convertUrlsToMarkdown(text: string): string {
  // Masks to protect existing constructs from being altered
  const masks: string[] = [];
  const mask = (regex: RegExp) => {
    text = text.replace(regex, (match) => {
      const id = masks.push(match) - 1;
      return `__MASK_${id}__`;
    });
  };

  // 1) Mask code blocks, code spans, existing markdown links/images, and existing autolinks
  mask(/```[\s\S]*?```/g); // fenced code blocks
  mask(/`[^`]*`/g); // inline code
  mask(/!?\[[^\]]*\]\([^\)]+\)/g); // markdown links/images
  mask(/<https?:\/\/[^>\s]+>/g); // existing autolinks

  // 2) Convert bracketed URLs: [https://example.com] -> [https://example.com](https://example.com)
  text = text.replace(
    /\[(https?:\/\/[^\]\s]+)\]([.,!?;:])?/g,
    (_m, url: string, punct?: string) => {
      return `[${url}](${url})${punct || ""}`;
    }
  );

  // 3) Convert angle-bracketed URLs: <https://example.com>
  text = text.replace(
    /<\s*(https?:\/\/[^>\s]+)\s*>([.,!?;:])?/g,
    (_m, url: string, punct?: string) => {
      return `[${url}](${url})${punct || ""}`;
    }
  );

  // 3.5) Mask any markdown links created by steps 2-3 to prevent double-wrapping in step 4
  mask(/!?\[[^\]]*\]\([^\)]+\)/g);

  // 4) Convert bare URLs not already masked. Preserve trailing punctuation like .,!?;:
  text = text.replace(
    /(^|[^\w\]])(https?:\/\/[^\s<>)\]\}]+)([.,!?;:])?/g,
    (_m, prefix: string, url: string, punct?: string) => {
      return `${prefix}[${url}](${url})${punct || ""}`;
    }
  );

  // 5) Restore masks
  text = text.replace(
    /__MASK_(\d+)__/g,
    (_m, idx: string) => masks[Number(idx)]
  );

  // 6) Ensure no markdown link URL ends with a period. If present, move the period(s) outside the link
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (full, label: string, url: string) => {
      const trailingDotsMatch = url.match(/\.+$/);
      if (!trailingDotsMatch) return full;
      const trimmedUrl = url.replace(/\.+$/, "");
      const trailingDots = trailingDotsMatch[0];
      return `[${label}](${trimmedUrl})`;
    }
  );

  return text;
}

export default function Chat() {
  const { siteConfig } = useDocusaurusContext();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "https://jc4mp.com/api/v1/chat",
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout
      title={`Chat with Rico`}
      description="Chat with Rico to learn about JC4MP server scripting - get help setting up servers, creating scripts and gamemodes, adding mods, and more"
    >
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.length === 0 && (
            <div className={clsx(styles.message, styles.assistantMessage)}>
              <div className={styles.messageRole}>Rico</div>
              <div className={styles.messageContent}>
                <div className={styles.markdownContent}>
                  <p>
                    👋 Hello! I'm here to help you with JC4MP development
                    questions. Ask me anything about the API, scripting, or
                    gamemode development!
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                styles.message,
                message.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              )}
            >
              <div className={styles.messageRole}>
                {message.role === "user" ? "You" : "Rico"}
              </div>
              <div className={styles.messageContent}>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className={styles.markdownContent}
                        >
                          {message.role === "user" ? (
                            <p>{part.text}</p>
                          ) : (
                            <ReactMarkdown
                              components={{
                                code: ({
                                  node,
                                  className,
                                  children,
                                  ...props
                                }) => {
                                  const match = /language-(\w+)/.exec(
                                    className || ""
                                  );
                                  return match ? (
                                    <CodeBlock className={className}>
                                      {String(children).replace(/\n$/, "")}
                                    </CodeBlock>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                a: ({ href, children }) => (
                                  <CustomLink href={href || "#"}>
                                    {children}
                                  </CustomLink>
                                ),
                              }}
                            >
                              {convertUrlsToMarkdown(part.text)}
                            </ReactMarkdown>
                          )}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <div className={clsx(styles.message, styles.assistantMessage)}>
                <div className={styles.messageRole}>Rico</div>
                <div className={styles.messageContent}>
                  <div className={styles.markdownContent}>
                    <div className={styles.loadingDots}>
                      <div className={styles.loadingDot}></div>
                      <div className={styles.loadingDot}></div>
                      <div className={styles.loadingDot}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              autoFocus
              className={styles.input}
              value={input}
              placeholder="Ask me about JC4MP development..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <LoaderCircle className={styles.spinner} />
              ) : (
                <ArrowRight />
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
