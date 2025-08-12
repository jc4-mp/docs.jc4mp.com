import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { ArrowRight, Loader, LoaderCircle } from "lucide-react";

// Custom code component for syntax highlighting
function CodeBlock({ children, className }: { children: string; className?: string }) {
  const { colorMode } = useColorMode();
  const language = className?.replace(/language-/, '') || 'text';
  
  // Map common language aliases to Prism language names
  const languageMap: { [key: string]: string } = {
    'lua': 'lua',
  };

  const prismLanguage = languageMap[language.toLowerCase()] || 'text';
  
  return (
    <Highlight
      code={children.trim()}
      language={prismLanguage}
      theme={colorMode === 'dark' ? themes.vsDark : themes.vsLight}
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
  );
}

// Custom link component for better styling
function CustomLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isHttps = href?.startsWith('https');
  
  return (
    <a
      href={href}
      target={isHttps ? '_blank' : undefined}
      rel={isHttps ? 'noopener noreferrer' : undefined}
      className={styles.markdownLink}
    >
      {children}
      {isHttps}
    </a>
  );
}

// Function to convert plain URLs to markdown links
function convertUrlsToMarkdown(text: string): string {
  // Only convert URLs that are not already part of markdown links
  // This regex looks for URLs that are NOT preceded by ]( and NOT followed by )
  const urlRegex = /(?<!\]\()(https?:\/\/[^\s\)]+)(?!\))/g;
  return text.replace(urlRegex, '[$1]($1)');
}

export default function Chat() {
  const { siteConfig } = useDocusaurusContext();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
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
    <Layout title={`Chat - ${siteConfig.title}`} description="Chat with Rico and create scripts">
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.length === 0 && (
            <div className={clsx(styles.message, styles.assistantMessage)}>
              <div className={styles.messageRole}>Rico</div>
              <div className={styles.messageContent}>
                <div className={styles.markdownContent}>
                  <p>👋 Hello! I'm here to help you with JC4MP development questions. Ask me anything about the API, scripting, or gamemode development!</p>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={clsx(
                styles.message, 
                message.role === "user" ? styles.userMessage : styles.assistantMessage
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
                        <div key={`${message.id}-${i}`} className={styles.markdownContent}>
                          {message.role === "user" ? (
                            <p>{part.text}</p>
                          ) : (
                            <ReactMarkdown
                              components={{
                                code: ({ node, className, children, ...props }) => {
                                  const match = /language-(\w+)/.exec(className || '');
                                  return match ? (
                                    <CodeBlock className={className}>
                                      {String(children).replace(/\n$/, '')}
                                    </CodeBlock>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                a: ({ href, children }) => (
                                  <CustomLink href={href || '#'}>
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
          
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
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
              {isLoading ? <LoaderCircle className={styles.spinner} /> : <ArrowRight />}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
