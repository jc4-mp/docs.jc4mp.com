import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Highlight, themes } from "prism-react-renderer";
import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { ArrowRight, Loader, LoaderCircle, Copy, Check } from "lucide-react";

/**
 * Splits text into logical chunks for incremental rendering
 */
function splitIntoChunks(text: string): string[] {
  if (!text) return [];
  
  // Split by double newlines (paragraphs) and code blocks
  const chunks = [];
  let currentChunk = '';
  let inCodeBlock = false;
  
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect code block boundaries
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      currentChunk += line + '\n';
      
      // If we're ending a code block, complete this chunk
      if (!inCodeBlock) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      continue;
    }
    
    currentChunk += line + '\n';
    
    // If not in code block and we hit an empty line or end, complete chunk
    if (!inCodeBlock && (line.trim() === '' || i === lines.length - 1)) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
    }
  }
  
  // Add any remaining content
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

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
const CustomLink = memo(function CustomLink({
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
});

/**
 * Individual chunk renderer that memoizes its content to prevent unnecessary re-renders
 */
const ChunkRenderer = memo(function ChunkRenderer({
  chunk,
  index,
}: {
  chunk: string;
  index: number;
}) {
  const markdownComponents = useMemo(() => ({
    code: ({
      node,
      className,
      children,
      ...props
    }: any) => {
      const match = /language-(\w+)/.exec(className || "");
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
    a: ({ href, children }: any) => (
      <CustomLink href={href || "#"}>
        {children}
      </CustomLink>
    ),
  }), []);

  return (
    <div key={`chunk-${index}`} className={styles.markdownChunk}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {fixAssistantText(chunk)}
      </ReactMarkdown>
    </div>
  );
});

/**
 * Optimized markdown renderer that renders content in chunks to avoid re-processing completed content
 */
const ChunkedMarkdown = memo(function ChunkedMarkdown({
  content,
  isStreaming,
}: {
  content: string;
  isStreaming: boolean;
}) {
  const [processedChunks, setProcessedChunks] = useState<string[]>([]);
  const [pendingContent, setPendingContent] = useState<string>('');
  
  useEffect(() => {
    if (!content) {
      setProcessedChunks([]);
      setPendingContent('');
      return;
    }

    const chunks = splitIntoChunks(content);
    
    if (!isStreaming) {
      // When not streaming, process all chunks immediately
      setProcessedChunks(chunks);
      setPendingContent('');
    } else {
      // When streaming, only process complete chunks
      const completeChunks = chunks.slice(0, -1);
      const lastChunk = chunks[chunks.length - 1] || '';
      
      // Check if we have new complete chunks
      if (completeChunks.length > processedChunks.length) {
        setProcessedChunks(completeChunks);
      }
      
      // Set pending content (the incomplete last chunk)
      setPendingContent(lastChunk);
    }
  }, [content, isStreaming, processedChunks.length]);

  return (
    <div className={styles.chunkedContent}>
      {/* Render completed chunks (these never re-render) */}
      {processedChunks.map((chunk, index) => (
        <ChunkRenderer key={index} chunk={chunk} index={index} />
      ))}
      
      {/* Render pending content during streaming */}
      {isStreaming && pendingContent && (
        <div className={styles.pendingChunk}>
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {fixAssistantText(pendingContent)}
          </span>
        </div>
      )}
    </div>
  );
});

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
 * Extracts file names from a tool response and converts them to documentation URLs
 */
function extractFileNamesFromResponse(response: string): string[] {
  if (!response) return [];
  
  const fileNameRegex = /<file name="([^"]+)"/g;
  const fileNames: string[] = [];
  let match;
  
  while ((match = fileNameRegex.exec(response)) !== null) {
    const fileName = match[1];
    // The file name should already be in the format https://docs.jc4mp.com/...
    if (fileName.startsWith('https://docs.jc4mp.com/')) {
      fileNames.push(fileName);
    }
  }
  
  return fileNames;
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
  onToggle,
  isCurrentlyLoading
}: {
  searchTools: any[];
  totalDocs: number;
  hasCompleted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  isCurrentlyLoading?: boolean;
}) {
  const hasRunningSearches = searchTools.some(tool => !tool.result);
  
  // If any searches are still running AND we're currently loading, show loading state
  if (hasRunningSearches && isCurrentlyLoading) {
    return (
      <div className={styles.toolCallContainer}>
        <div className={clsx(styles.toolCall, styles.toolCallShimmer)}>
          Reading docs...
        </div>
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
          Read {totalDocs} docs {isExpanded ? '▼' : '▶'}
        </div>
        {isExpanded && (
          <div className={styles.toolDetails}>
            {searchTools.map((tool, index) => {
              const toolPages = tool.result ? extractFileNamesFromResponse(tool.result) : [];
              return (
                <div key={index} className={styles.toolDetailSection}>
                  <div className={styles.toolDetailItem}>
                    <span className={styles.toolDetailLabel}>Search:</span>
                    <span className={styles.toolDetailValue}>"{tool.args?.query || 'N/A'}"</span>
                  </div>
                  {toolPages.length > 0 && (
                    <div className={styles.toolDetailItem}>
                      <span className={styles.toolDetailLabel}>Pages:</span>
                      <div className={styles.toolDetailValue}>
                        {toolPages.map((pageUrl, pageIndex) => {
                          // Extract the page name from the URL for display
                          const pageName = pageUrl.replace('https://docs.jc4mp.com/', '').replace(/\/$/, '');
                          return (
                            <div key={pageIndex} className={styles.foundPageItem}>
                              <a 
                                href={pageUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.foundPageLink}
                              >
                                {pageName}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
  onToggle,
  isCurrentlyLoading
}: { 
  toolCall: any; 
  isExpanded: boolean;
  onToggle: () => void;
  isCurrentlyLoading?: boolean;
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

  // Only show "Running..." indicator if we're currently loading
  if (isCurrentlyLoading) {
    return (
      <div className={clsx(styles.toolCall, styles.toolCallShimmer)}>
        Running {toolCall.toolName}...
      </div>
    );
  }

  // If not loading and no result, don't show anything
  return null;
}



export default function Chat() {
  const { siteConfig } = useDocusaurusContext();
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "https://jc4mp.com/api/v1/chat",
      // api: "http://localhost:5173/api/v1/chat",
      onError: (error) => {
        console.error(error);
      },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [expandedToolCalls, setExpandedToolCalls] = useState<Set<string>>(new Set());
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldAutoScroll]);

  const toggleToolCall = useCallback((toolCallId: string) => {
    setExpandedToolCalls(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolCallId)) {
        newSet.delete(toolCallId);
      } else {
        newSet.add(toolCallId);
      }
      return newSet;
    });
  }, []);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    if (isLoading) {
      e.preventDefault();
      stop();
    }
    // If not loading, the form's onSubmit will handle the submission
  }, [isLoading, stop]);

  // Check if user has scrolled up from the bottom
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px threshold
      setShouldAutoScroll(isAtBottom);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <Layout
      title={`Chat with Rico`}
      description="Chat with Rico to learn about JC4MP server scripting - get help setting up servers, creating scripts and gamemodes, adding mods, and more"
    >
      <div className={styles.chatContainer}>
        <div 
          className={styles.messagesContainer}
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
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
                  const isLastMessage = message.id === messages[messages.length - 1]?.id;
                  const isCurrentlyLoading = isLastMessage && isLoading;
                  
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
                          isCurrentlyLoading={isCurrentlyLoading}
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
                            isCurrentlyLoading={isCurrentlyLoading}
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
                      const isLastMessage = message.id === messages[messages.length - 1]?.id;
                      const isStreamingMessage = isLastMessage && isLoading;
                      
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className={styles.markdownContent}
                        >
                          {message.role === "user" ? (
                            <p>{part.text}</p>
                          ) : (
                            <ChunkedMarkdown 
                              content={part.text}
                              isStreaming={isStreamingMessage}
                            />
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
              className={clsx(styles.sendButton, isLoading && styles.loadingButton)}
              disabled={!isLoading && !input.trim()}
              onClick={handleButtonClick}
            >
              {isLoading ? (
                <div className={styles.loadingIndicator}>
                  <LoaderCircle className={styles.spinner} />
                  <div className={styles.stopSquare} />
                </div>
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
