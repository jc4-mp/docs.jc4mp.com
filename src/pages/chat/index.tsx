import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  return (
    <a
      href={href}
      target={isHttps ? "_blank" : undefined}
      rel={isHttps ? "noopener noreferrer" : undefined}
      className={styles.markdownLink}
    >
      {children}
    </a>
  );
}

/**
 * Fixes common text issues in assistant responses.
 * Currently handles:
 * - Replace "Just Cause4 Multiplayer" with "Just Cause 4 Multiplayer" (adds missing space)
 */
function fixAssistantText(text: string): string {
  return text.replace(/Just Cause4/g, "Just Cause 4");
}

/**
 * Counts the number of file references in a tool response
 */
function countFilesInResponse(response: string): number {
  const matches = response.match(/<file/g);
  return matches ? matches.length : 0;
}

/**
 * Groups tool calls by type and calculates total file counts
 */
function groupToolCalls(toolInvocations: any[]) {
  const searchDocs = toolInvocations.filter(tool => tool.toolName === "search_docs");
  const otherTools = toolInvocations.filter(tool => tool.toolName !== "search_docs");
  
  const totalSearchedDocs = searchDocs.reduce((total, tool) => {
    return total + (tool.result ? countFilesInResponse(tool.result) : 0);
  }, 0);
  
  return {
    searchDocs,
    otherTools,
    totalSearchedDocs,
    hasCompletedSearches: searchDocs.some(tool => tool.result)
  };
}

/**
 * Component for displaying combined search results
 */
function CombinedSearchIndicator({
  searchTools,
  totalDocs,
  hasCompleted,
  isExpanded,
  onToggle
}: {
  searchTools: any[];
  totalDocs: number;
  hasCompleted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasRunningSearches = searchTools.some(tool => !tool.result);
  
  // If any searches are still running, show loading state
  if (hasRunningSearches) {
    return (
      <div className={clsx(styles.toolCall, styles.toolCallShimmer)}>
        Searching docs...
      </div>
    );
  }

  // If all searches are completed
  if (hasCompleted) {
    return (
      <div className={styles.toolCallContainer}>
        <div 
          className={clsx(styles.toolCall, styles.toolCallCompleted)}
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggle();
            }
          }}
        >
          Searched {totalDocs} docs {isExpanded ? '▼' : '▶'}
        </div>
        {isExpanded && (
          <div className={styles.toolDetails}>
            {searchTools.map((tool, index) => (
              <div key={index} className={styles.toolDetailSection}>
                <div className={styles.toolDetailItem}>
                  <span className={styles.toolDetailLabel}>Query {index + 1}:</span>
                  <span className={styles.toolDetailValue}>"{tool.args?.query || 'N/A'}"</span>
                </div>
                <div className={styles.toolDetailItem}>
                  <span className={styles.toolDetailLabel}>Results:</span>
                  <span className={styles.toolDetailValue}>
                    {tool.result ? countFilesInResponse(tool.result) : 0} documents found
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

/**
 * Renders a tool call indicator for non-search tools
 */
function ToolCallIndicator({ 
  toolCall, 
  isExpanded, 
  onToggle 
}: { 
  toolCall: any; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  // For other tool calls, show a generic indicator
  if (toolCall.result) {
    return (
      <div className={styles.toolCallContainer}>
        <div 
          className={clsx(styles.toolCall, styles.toolCallCompleted)}
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggle();
            }
          }}
        >
          Completed {toolCall.toolName} {isExpanded ? '▼' : '▶'}
        </div>
        {isExpanded && (
          <div className={styles.toolDetails}>
            <div className={styles.toolDetailItem}>
              <span className={styles.toolDetailLabel}>Tool:</span>
              <span className={styles.toolDetailValue}>{toolCall.toolName}</span>
            </div>
            <div className={styles.toolDetailItem}>
              <span className={styles.toolDetailLabel}>Status:</span>
              <span className={styles.toolDetailValue}>Completed</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(styles.toolCall, styles.toolCallShimmer)}>
      Running {toolCall.toolName}...
    </div>
  );
}



export default function Chat() {
  const { siteConfig } = useDocusaurusContext();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      // api: "https://jc4mp.com/api/v1/chat",
      api: "http://localhost:5173/api/v1/chat",
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandedToolCalls, setExpandedToolCalls] = useState<Set<string>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleToolCall = (toolCallId: string) => {
    setExpandedToolCalls(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolCallId)) {
        newSet.delete(toolCallId);
      } else {
        newSet.add(toolCallId);
      }
      return newSet;
    });
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
                {/* Render tool invocations first */}
                {message.toolInvocations && (() => {
                  const { searchDocs, otherTools, totalSearchedDocs, hasCompletedSearches } = groupToolCalls(message.toolInvocations);
                  const searchId = `${message.id}-search`;
                  
                  return (
                    <>
                      {/* Combined search docs indicator */}
                      {searchDocs.length > 0 && (
                        <CombinedSearchIndicator
                          searchTools={searchDocs}
                          totalDocs={totalSearchedDocs}
                          hasCompleted={hasCompletedSearches}
                          isExpanded={expandedToolCalls.has(searchId)}
                          onToggle={() => toggleToolCall(searchId)}
                        />
                      )}
                      
                      {/* Other tool calls */}
                      {otherTools.map((toolInvocation, i) => {
                        const toolCallId = `${message.id}-other-${i}`;
                        return (
                          <ToolCallIndicator
                            key={`tool-${toolCallId}`}
                            toolCall={toolInvocation}
                            isExpanded={expandedToolCalls.has(toolCallId)}
                            onToggle={() => toggleToolCall(toolCallId)}
                          />
                        );
                      })}
                    </>
                  );
                })()}

                {/* Render message parts */}
                {message.parts?.map((part, i) => {
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
                              remarkPlugins={[remarkGfm]}
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
                              {fixAssistantText(part.text)}
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
